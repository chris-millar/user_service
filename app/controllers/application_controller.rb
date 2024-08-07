class ApplicationController < ActionController::Base
  include Pagy::Backend

  def paged_json_with_meta(records:, paging:, filters: {}, sort: nil)
    {
      data: records,
      metadata: {
        paging: pagy_metadata(paging),
        filters: filters,
        sort: sort
      }
    }
  end

  def page_limit
    params.permit(:page_limit)[:page_limit]
  end

  def paginate(scope)
    pagy(scope, limit: page_limit || Api::PaginationHelper.limit)
  end
end
