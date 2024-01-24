class Api::V1::CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_current_user, only: [:create]
  before_action :find_comment, only: [:show, :update, :destroy]
  
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create!(content: params[:content], user_id: @current_user.id)
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors
    end
  end

  def show
    render json: @comment
  end

  def update
    if @comment.update(content: params[:content])
      render json: @comment
    else
      render json:@comment.errors
    end
  end

  def destroy
    @comment.destroy
    render json: { message: 'Comment deleted!' }
  end

  private
    def set_current_user
      if session[:user_id]
        @current_user = User.find(session[:user_id])
      end
    end

    def find_comment
      @comment = Comment.find(params[:id])
    end

end