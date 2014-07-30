Rails.application.routes.draw do
  resources :events
  resources :users

  root 'events#index'

  get 'create', to: 'events#create'

end
