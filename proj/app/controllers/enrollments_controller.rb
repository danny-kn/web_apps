class EnrollmentsController < ApplicationController
  before_action :set_course
  
  def create
    @enrollment = @course.enrollments.new(user: current_user)
    authorize @enrollment
    
    if @enrollment.save
      redirect_to @course, notice: 'You have successfully enrolled in this course.'
    else
      redirect_to @course, alert: 'Unable to enroll in this course.'
    end
  end
  
  def destroy
    @enrollment = @course.enrollments.find_by(user: current_user)
    authorize @enrollment
    
    @enrollment.destroy
    redirect_to @course, notice: 'You have successfully unenrolled from this course.'
  end
  
  private
  
  def set_course
    @course = Course.find(params[:course_id])
  end
end 
