class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_current_user

  def create
    user = User.find_by(username: params["user"]["username"])
    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: { 
      status: 200,
      logged_out: true
    }
  end

  private
    def set_current_user
      if session[:user_id]
        @current_user = User.find(session[:user_id])
      end
    end
end