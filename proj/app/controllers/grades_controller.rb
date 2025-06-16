class GradesController < ApplicationController
  before_action :authenticate_user!
  before_action :ensure_instructor
  before_action :set_presentation
  before_action :set_grade, only: [:edit, :update]

  def new
    @presentation = Presentation.find(params[:presentation_id])
    if @presentation.grade.present?
      redirect_to @presentation, alert: 'This presentation has already been graded.'
    else
      @grade = @presentation.build_grade
    end
  end

  def create
    @presentation = Presentation.find(params[:presentation_id])
    @grade = @presentation.build_grade(grade_params)
    @grade.instructor = current_user
    
    if @grade.save
      redirect_to @presentation, notice: 'Grade was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @grade.update(grade_params)
      redirect_to @presentation, notice: 'Grade was successfully updated.'
    else
      render :edit
    end
  end

  private

  def set_presentation
    @presentation = Presentation.find(params[:presentation_id])
  end

  def set_grade
    @grade = @presentation.grade
  end

  def grade_params
    params.require(:grade).permit(:score, :feedback)
  end

  def ensure_instructor
    unless current_user.instructor?
      redirect_to root_path, alert: 'Only instructors can grade presentations.'
    end
  end
end 
