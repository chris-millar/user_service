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

      configured_sort = self.class.configured_sort

      value = params.permit(:sort_order)[:sort_order] || configured_sort.default
      model_field_name = configured_sort.aliases || configured_sort.field

      sorted_scope = sorted_scope.order(model_field_name => value)
      applied_sorts[configured_sort.field] = value

      sorted_scope
    end
  end

  class_methods do
    def sort_via(field, default: :asc, aliases: nil)
      @configured_sort = OpenStruct.new(
          field: field,
          default: default,
          aliases: aliases
        )
    end

    def configured_sort
      @configured_sort
    end
  end
end
