class Api::ImportsController < ApiController
  filter :filename, :optional, type: String, operators: [:eq]
  filter :performed_at, :optional, type: Hash, operators: [:gte, :gt, :lt, :lte]
  filter :performed_at, :optional, type: String, operators: [:eq]
  filter :status, :optional, type: String, operators: [:eq]

  sort_via :id, default: :asc

  def create
    file = params.require(:file)
    return render json: { error: 'No file uploaded' }, status: :unprocessable_entity unless file.present?
    return render json: { error: 'Invalid file format' }, status: :unprocessable_entity unless file.content_type == 'text/csv'

    import = Importer.import(file)

    if import.status === "done"
      render json: import, status: :ok
    else
      render json: import, status: :bad_request
    end
  end

  def index
    load_requested_records
    render json: formatted_response_json
  end

  def show
    @import ||= Import.find(params[:id])
    render json: @import
  rescue ActiveRecord::RecordNotFound
    render json: { error: "No record found!" }, status: :not_found
  end

  def base_record_scope
    Import.all
  end
end