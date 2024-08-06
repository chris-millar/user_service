class Api::UsersController < ApplicationController
  def show
    @user ||= User.find(params[:id])
    render json: @user
  rescue ActiveRecord::RecordNotFound
    render json: { error: "No record found!" }, status: :not_found
  end

  def index
    @pagy, @users = pagy(users_requested)
    render json: paged_json_with_meta(pagy: @pagy, records: @users)
  end

  def users_requested
    return User.where(profession: profession) if profession.present?

    User.all
  end

  def profession
    user_params[:profession]
  end

  def user_params
    params.permit(:profession => [])
  end
end
