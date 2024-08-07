class Api::UsersController < ApplicationController
  include ApiFiltering
  filter :profession, :optional, type: Array, operators: [:in]
  filter :profession, :optional, type: String, operators: [:eq]
  filter :date_created, :optional, type: Hash, operators: [:gte, :gt, :lt, :lte], aliases: :created_at
  filter :date_created, :optional, type: String, operators: [:eq], aliases: :created_at

  def show
    @user ||= User.find(params[:id])
    render json: @user
  rescue ActiveRecord::RecordNotFound
    render json: { error: "No record found!" }, status: :not_found
  end

  def index
    @pagy, @users = pagy(users_requested)
    render json: paged_json_with_meta(records: serialized_users, paging: @pagy, filters: applied_filters)
  end

  def serialized_users
    ActiveModelSerializers::SerializableResource.new(@users.to_a)
  end

  def users_requested
    apply_filters(User.all)
  end
end
