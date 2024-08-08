Rails.application.routes.draw do
  namespace :app do
    root to: "root#index"
    get "*path", to: "root#index"
  end

  namespace :api do
    resources :users, only: [:index, :show]
  end

  get "up" => "rails/health#show", as: :rails_health_check

  root :to => redirect("/app")
  match "*path", to: redirect("/app"), via: :all
end
