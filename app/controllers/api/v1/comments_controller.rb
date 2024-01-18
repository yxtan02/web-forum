class Api::V1::CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_current_user, only: [:create]
  
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create!(content: params["content"], user_id: @current_user.id)
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors
    end
  end

  private

    def set_current_user
      if session[:user_id]
        @current_user = User.find(session[:user_id])
      end
    end

end