class Api::UsersController < ApiController
  filter :profession, :optional, type: Array, operators: [:in]
  filter :profession, :optional, type: String, operators: [:eq]
  filter :date_created, :optional, type: Hash, operators: [:gte, :gt, :lt, :lte], aliases: :created_at
  filter :date_created, :optional, type: String, operators: [:eq], aliases: :created_at

  sort_via :date_created, default: :asc, aliases: :created_at

  def show
    @user ||= User.find(params[:id])
    render json: @user
  rescue ActiveRecord::RecordNotFound
    render json: { error: "No record found!" }, status: :not_found
  end

  def index
    load_requested_records
    render json: formatted_response_json
  end

  def base_record_scope
    User.all
  end
end
