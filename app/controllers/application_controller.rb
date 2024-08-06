class ApplicationController < ActionController::Base
  include Pagy::Backend

  def paged_json_with_meta(records:, paging:, filters: {})
    {
      data: records,
      metadata: {
        paging: pagy_metadata(paging),
        filters: filters
      }
    }
  end
end
