Rails.application.routes.draw do
  get 'playlists/new'
  get 'playlists/create'
  get 'playlists/index'
  get 'playlists/show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :playlists, only: [:new, :create, :show, :index]
  root "playlists#new"
end
