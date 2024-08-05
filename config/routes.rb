Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'

  resources :users, only: [:show]

  get "up" => "rails/health#show", as: :rails_health_check

  root "hello_world#index"
end
