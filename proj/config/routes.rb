Rails.application.routes.draw do
  devise_for :users
  
  root "dashboard#index"
  
  resources :courses do
    resources :enrollments, only: [:create, :destroy]
    resources :presentations
  end
  
  resources :presentations do
    resources :evaluations, only: [:create, :index]
    resource :grade, only: [:new, :create, :edit, :update]
  end
  
  namespace :admin do
    resources :dashboard, only: [:index]
    resources :courses
    resources :users
  end
end
