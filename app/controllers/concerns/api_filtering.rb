require "active_support/concern"

module ApiFiltering
  extend ActiveSupport::Concern

  included do
    attr_accessor :applied_filters

    def applied_filters
      @applied_filters ||= {}
    end

    def permitted_params
      restrictions = @@_configured_filters.reduce({permit: [], require: []}) do |acc, configured_filter|
        restriction = configured_filter.optional ? :permit : :require
        field = configured_filter.type == Array ? [configured_filter.name => []] : [configured_filter.name]
        acc[restriction] << field

        acc
      end
      # TODO: handle the required params, cannot use the params.require because that gets us
      # the literal hash values instead of just permitting the params hash with those keys
      params.permit(restrictions[:permit].flatten)
    end

    def apply_filters(base_scope)
      filtered_scope = base_scope

      p_params = permitted_params
      @@_configured_filters.each do |configured_filter|
        value = configured_filter.value.call(p_params)
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

    def filter(param_name, option, type:, operator:)
      @@_configured_filters << OpenStruct.new(
        name: param_name,
        value: -> (params){ params[param_name] },
        operator: operator,
        optional: option === :optional,
        type: type,
      )
    end
  end
end
