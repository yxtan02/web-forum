class Api::V1::PostsController < ApplicationController
  before_action :find_post, only: [:show, :update, :destroy]

  def index
    post = Post.all.order(created_at: :desc)
    render json: post
  end

  def create
    post = Post.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
    render json: @post
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
        params.require(:post).permit(:title, :description)
    end

    def find_post
      @post = Post.find(params[:id])
    end

end
