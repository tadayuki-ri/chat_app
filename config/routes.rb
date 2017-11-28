Rails.application.routes.draw do
  # devise_for :usersがデフォルトで生成される
  # devise_for :usersに加えて以下を追加（参考：http://qiita.com/itboze/items/f991d54ff527edb844d9)
  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'   
  } 
  # devise_scope :user do
  #   get "sign_in", :to => "users/sessions#new"
  #   get "sign_out", :to => "users/sessions#destroy" 
  # end

  root 'messages#index'
  # deviseではusers#index, users#showに対応するものが生成されないためそれだけ新たに作成する必要がある。
  get 'users/search'
  resources :users, :only => [:index, :show]

  namespace :api, { format: :json } do
  	post '/messages', to: 'messages#create'
    post '/messages/pictures', to: 'messages#upload_picture'
    get '/users/search', to: 'users#search'
    get '/users/:id', to: 'users#show'
    resources :friends, :only=> [:index, :create, :destroy]
  end
end
