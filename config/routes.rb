Rails.application.routes.draw do
  resources :events
  resources :users

  root 'events#index'

  get 'new', to: 'events#new'

end
