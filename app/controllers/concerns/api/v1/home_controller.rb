module Api
  module V1
    class HomeController < ApplicationController
      def index
        render json: { message: "Welcome to the Job Search API" }
      end
    end
  end
end