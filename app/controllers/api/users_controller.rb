class Api::UsersController < ApplicationController
  def show
    @user ||= User.find(params[:id])
    render json: @user
  rescue ActiveRecord::RecordNotFound
    render json: { error: "No record found!" }, status: :not_found
  end

  def index
    @pagy, @users = pagy(User.all)
    render json: paged_json_with_meta(pagy: @pagy, records: @users)
  end
end
