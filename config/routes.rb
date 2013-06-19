Refriend::Application.routes.draw do
  resources :tasks do
    resources :references, only: %w(new create)
    post 'json', on: :collection
  end
  
  resources :references, only: %w(index edit edit update destroy)
  
  root to: 'tasks#index'
end
