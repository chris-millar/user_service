class ApplicationController < ActionController::Base
  include Pagy::Backend

  def paged_json_with_meta(pagy:, records:)
    { data: records, pagination: pagy_metadata(pagy) }
  end
end
