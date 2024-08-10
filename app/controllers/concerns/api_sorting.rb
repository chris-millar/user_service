require "active_support/concern"

module ApiSorting
  extend ActiveSupport::Concern

  VALID_SORTS = [:asc, :desc]

  included do
    attr_accessor :applied_sorts

    def applied_sorts
      @applied_sorts ||= {}
    end

    def apply_sort(base_scope)
      sorted_scope = base_scope

      configured_filter = @@_configured_sort

      value = params.permit(:sort_order)[:sort_order] || configured_filter.default
      model_field_name = configured_filter.aliases || configured_filter.name

      sorted_scope = sorted_scope.order(model_field_name => value)
      applied_sorts[configured_filter.field] = value

      sorted_scope
    end
  end

  class_methods do
    @@_configured_sort = nil

    def sort_via(field, default: :asc, aliases: nil)
      @@_configured_sort = OpenStruct.new(
          field: field,
          default: default,
          aliases: aliases
        )
    end
  end
end
