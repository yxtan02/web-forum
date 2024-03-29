class RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.create!(
      username: params["user"]["username"],
      password: params["user"]["password"]
    )

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: { status: 500 }
    end
  end
end