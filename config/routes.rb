Rails.application.routes.draw do
  namespace :app do
    root to: "hello_world#index"
    get 'hello_world', to: "hello_world#index"
  end

  namespace :api do
    resources :users, only: [:index, :show]
  end

  get "up" => "rails/health#show", as: :rails_health_check

  root :to => redirect("/app")
end
