class Api::ImportsController < ApiController
  def create
    # binding.irb
    file = params.require(:file)
    if file.present?
      render json: { error: 'Invalid file format' }, status: :unprocessable_entity unless file.content_type == 'text/csv'

      csv_content = file.read
      Importer.import(csv_content)

      render json: { message: 'Import completed successfully!' }, status: :ok
    else
      render json: { error: 'No file uploaded' }, status: :unprocessable_entity
    end
  end
end