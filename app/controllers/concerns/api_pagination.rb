require "active_support/concern"

module ApiPagination
  extend ActiveSupport::Concern
  include Pagy::Backend

  included do
    def paginate(scope)
      @pagy, records = pagy(scope, limit: page_limit || Api::PaginationHelper.limit)
      records
    end

    def page_limit
      params.permit(:page_limit)[:page_limit]
    end

    def paging_metadata
      pagy_metadata(@pagy)
    end

  end

  class_methods do
  end
end
