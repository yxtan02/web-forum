Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to: 'posts#show'
      put '/update/:id', to: 'posts#update'
      delete '/destroy/:id', to: 'posts#destroy'
      get 'posts/filter/:category', to: 'posts#filter'
      get '/comments/:id', to: 'comments#show'
      put '/comments/:id', to: 'comments#update'
      resources :posts do
        resources :comments, except: [:show, :update]
      end
    end
  end

  resources :sessions, only: [:create] 
  resources :registrations, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'


  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
