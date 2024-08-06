class ApplicationController < ActionController::Base
  include Pagy::Backend

  def paged_json_with_meta(pagy:, records:)
    { data: records, metadata: pagy_metadata(pagy) }
  end
end
