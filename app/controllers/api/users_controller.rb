class Api::UsersController < ApplicationController
  def show
    @user ||= User.find(params[:id])
    render json: @user
  rescue ActiveRecord::RecordNotFound
    render json: { error: "No record found!" }, status: :not_found
  end

  def index
    @pagy, @users = pagy(users_requested)
    render json: paged_json_with_meta(records: @users, paging: @pagy, filters: @applied_filters)
  end

  def users_requested
    apply_filters(User.all)
  end

  def apply_filters(base_scope)
    @applied_filters = {}
    filtered_scope = base_scope

    if profession.present?
      filtered_scope = filtered_scope.where(profession: profession)
      @applied_filters[:profession] = { value: profession, operator: :in }
    end

    filtered_scope
  end

  def profession
    user_params[:profession]
  end

  def user_params
    params.permit(:profession => [])
  end
end
