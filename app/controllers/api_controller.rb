class ApiController < ActionController::Base
  include ApiPagination
  include ApiFiltering
  include ApiSorting

  def load_requested_records
    @records = paginate(apply_sort(apply_filters(base_record_scope)))
  end

  def formatted_response_json
    {
      data: serialized_records,
      metadata: {
        paging: paging_metadata,
        filters: applied_filters,
        sort: applied_sorts
      }
    }
  end

  def base_record_scope
    raise NotImplementedError
  end

  def serialized_records
    ActiveModelSerializers::SerializableResource.new(@records.to_a)
  end
end
