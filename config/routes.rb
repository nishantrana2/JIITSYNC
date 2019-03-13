require 'resque/server'

Rails.application.routes.draw do

  mount Resque::Server.new, at: "/resque"
  
  namespace :api do

    namespace :v1 do
      get 'home', to: 'posts#home'
      post 'posts/create', to: 'posts#create'
      post 'users/sign_in', to: 'users#sign_in'
    end

    namespace :v2 do
       get 'home', to: 'posts#home'

    end

    
  end

  
  # resources :products do
  #   post :get_barcode, on: :collection
  # end




  get 'users/profile/:id', to: 'users#profile'
  get 'users/search', to: 'users#search'
 

  post 'users/upload_avatar/:id', to: 'users#upload_avatar', as: :user_avatar_upload
  

  post 'likes/toggle/:post_id', to: 'likes#toggle', as: :toggle_like

  post 'comments/create', as: :comments
  delete 'comments/:id', to: 'comments#destroy', as: :destroy_comment

	# Post routes
  root 'posts#home'
  get 'posts/home', to: 'posts#home'
  post 'posts/create', as: :posts
  delete 'posts/:id', to: 'posts#destroy', as: :destroy_post

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get 'visitors/index', to: 'visitors#index'

# rake routes
#               Prefix Verb   URI Pattern                     Controller#Action
# get_barcode_products POST   /products/get_barcode(.:format) products#get_barcode
#             products GET    /products(.:format)             products#index
#                      POST   /products(.:format)             products#create
#          new_product GET    /products/new(.:format)         products#new
#         edit_product GET    /products/:id/edit(.:format)    products#edit
#              product GET    /products/:id(.:format)         products#show
#                      PATCH  /products/:id(.:format)         products#update
#                      PUT    /products/:id(.:format)         products#update
#                      DELETE /products/:id(.:format)         products#destroy
#                 root GET    /                               visitors#index

end







