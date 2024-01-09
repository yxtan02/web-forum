Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to:'posts#show'
      put '/update/:id', to: 'posts#update'
      delete '/destroy/:id', to: 'posts#destroy'
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
