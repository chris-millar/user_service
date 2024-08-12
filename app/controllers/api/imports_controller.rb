class Api::ImportsController < ApiController
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
end