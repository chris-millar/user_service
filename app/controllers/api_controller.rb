class ApiController < ActionController::Base
  include Pagy::Backend
  include ApiFiltering
  include ApiSorting

  def load_requested_records
    @pagy, @records = paginate(apply_sort(apply_filters(base_record_scope)))
  end

  def formatted_response_json
    {
      data: serialized_records,
      metadata: {
        paging: pagy_metadata(@pagy),
        filters: applied_filters,
        sort: applied_sorts
      }
    }
  end

  def page_limit
    params.permit(:page_limit)[:page_limit]
  end

  def paginate(scope)
    pagy(scope, limit: page_limit || Api::PaginationHelper.limit)
  end

  def base_record_scope
    raise NotImplementedError
  end

  def serialized_records
    ActiveModelSerializers::SerializableResource.new(@records.to_a)
  end
end
