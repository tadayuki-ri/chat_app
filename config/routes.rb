Rails.application.routes.draw do
  root 'messages#index'
  
  namespace :api, { format: :json } do
  	# get 'messages' => 'messages#index'
  	get '/messages', to: 'messages#index'
  	post '/messages', to: 'messages#create'
  end
end
