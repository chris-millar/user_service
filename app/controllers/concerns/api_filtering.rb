require "active_support/concern"

module ApiFiltering
  extend ActiveSupport::Concern

  included do
    attr_accessor :applied_filters

    def applied_filters
      @applied_filters ||= {}
    end

    def apply_filters(base_scope)
      filtered_scope = base_scope

      @@_configured_filters.each do |configured_filter|
        value = configured_filter.value.call(params)
        if value.present?
          model_field_name = configured_filter.aliases || configured_filter.name
          condition = -> (operator) do
            return model_field_name => value if [:in, :eq].include?(operator)
            return ["#{model_field_name} > ?", value] if operator === :gt
            return ["#{model_field_name} >= ?", value] if operator === :gte
            return ["#{model_field_name} < ?", value] if operator === :lt
            return ["#{model_field_name} <= ?", value] if operator === :lte
          end
          filter_name = -> () do
            return "#{configured_filter.name}[#{configured_filter.operator}]" if configured_filter.type == Hash
            configured_filter.name
          end

          filtered_scope = filtered_scope.where(condition.call(configured_filter.operator))
          applied_filters[filter_name.call] = { value: value, operator: configured_filter.operator }
        end
      end

      filtered_scope
    end

  end

  class_methods do
    @@_configured_filters = []

    def filter(param_name, option, type:, operators:, aliases: nil)
      operators.each do |operator|
        field = -> (type) do
          return [param_name => []] if type == Array
          return [param_name => {}] if type == Hash
          [param_name]
        end

        fetch_param = -> (params) do
          return params.permit(field.call(type)).dig(param_name.to_s, operator.to_s) if type == Hash
          params.permit(field.call(type))[param_name]
        end

        @@_configured_filters << OpenStruct.new(
          name: param_name,
          value: fetch_param,
          operator: operator,
          optional: option === :optional,
          type: type,
          aliases: aliases
        )
      end
    end
  end
end
