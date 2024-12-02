# app/controllers/api/v1/home_controller.rb
module Api
  module V1
    class HomeController < ApplicationController
      def index
        # ここで必要なデータを取得して返すこともできます
        render json: { message: "Welcome to the Job Search API" }
      end
    end
  end
end