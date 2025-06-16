class CoursesController < ApplicationController
  before_action :set_course, only: [:show, :edit, :update, :destroy]
  
  def index
    @courses = policy_scope(Course)
  end
  
  def show
    authorize @course
    @presentations = @course.presentations.order(presentation_date: :desc)
    @students = @course.students
  end
  
  def new
    @course = Course.new
    authorize @course
  end
  
  def create
    @course = Course.new(course_params)
    @course.instructor = current_user
    authorize @course
    
    if @course.save
      redirect_to @course, notice: 'Course was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def edit
    @course = Course.find(params[:id])
    authorize @course
  end
  
  def update
    @course = Course.find(params[:id])
    authorize @course
    if @course.update(course_params)
      redirect_to @course, notice: 'Course was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    authorize @course
    @course.destroy
    redirect_to courses_url, notice: 'Course was successfully deleted.'
  end
  
  private
  
  def set_course
    @course = Course.find(params[:id])
  end
 
  def course_params
    params.require(:course).permit(:name, :code, student_ids: [])
  end
end 
