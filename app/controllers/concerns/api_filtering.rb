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
          filtered_scope = filtered_scope.where(configured_filter.name => value)
          applied_filters[configured_filter.name] = { value: value, operator: configured_filter.operator }
        end
      end

      filtered_scope
    end

  end

  class_methods do
    @@_configured_filters = []

    def filter(param_name, option, type:, operators:)
      operators.each do |operator|
        field = -> (type) do
          return [param_name => []] if type == Array
          [param_name]
        end

        fetch_param = -> (params) do
          params.permit(field.call(type))[param_name]
        end

        @@_configured_filters << OpenStruct.new(
          name: param_name,
          value: fetch_param,
          operator: operator,
          optional: option === :optional,
          type: type,
        )
      end
    end
  end
end
