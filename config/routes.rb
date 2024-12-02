# config/routes.rb
Rails.application.routes.draw do
  # APIエンドポイントを設定
  namespace :api do
    namespace :v1 do
      get 'home', to: 'home#index'
    end
  end

  resources :categories, only: [:index]
  resources :jobs
end