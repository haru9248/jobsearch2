# config/routes.rb
Rails.application.routes.draw do
  root 'api/v1/home#index'
  # APIエンドポイントを設定
  namespace :api do
    namespace :v1 do
      get 'home', to: 'home#index'
    end
  end

  resources :categories, only: [:index]
  resources :jobs
end