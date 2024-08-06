class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: @user
  rescue ActiveRecord::RecordNotFound
    render json: { error: "No record found!" }, status: :not_found
  end
end
