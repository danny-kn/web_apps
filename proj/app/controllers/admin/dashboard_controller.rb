module Admin
  class DashboardController < ApplicationController
    def index
      authorize :dashboard, :index?
      @courses = Course.all
      @recent_presentations = Presentation.order(created_at: :desc).limit(5)
      @recent_evaluations = Evaluation.order(created_at: :desc).limit(10)
      @user_stats = {
        total_users: User.count,
        students: User.student.count,
        instructors: User.instructor.count,
        tas: User.ta.count
      }
    end
  end
end 
