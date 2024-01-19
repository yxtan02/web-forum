class Api::V1::PostsController < ApplicationController
  before_action :find_post, only: [:show, :update, :destroy]
  before_action :set_current_user, only: [:create]

  def index
    post = Post.all.order(created_at: :desc)
    render json: post
  end

  def create
    post = @current_user.posts.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
    render json: @post, include: [:user, :comments => {:include => :user}]
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json:@post.errors
    end
  end

  def destroy
    @post.destroy
    render json: { message: 'Post deleted!' }
  end

  private
    def post_params
        params.require(:post).permit(:title, :description, :category)
    end

    def find_post
      @post = Post.find(params[:id])
    end

    def set_current_user
      if session[:user_id]
        @current_user = User.find(session[:user_id])
      end
    end

end
