class PresentationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_presentation, only: [:show, :edit, :update, :destroy]
  before_action :set_course, only: [:index, :new, :create]
  
  def index
    @presentations = policy_scope(@course.presentations)
  end
  
  def show
    authorize @presentation
    @evaluation = Evaluation.new if @presentation.can_be_evaluated_by?(current_user)
  end
  
  def new
    @presentation = @course.presentations.new
    authorize @presentation
  end
  
  def create
    @presentation = @course.presentations.new(presentation_params)
    authorize @presentation
    
    if @presentation.save
      redirect_to course_presentation_path(@course, @presentation), 
                  notice: 'Presentation was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end
  
  def edit
    authorize @presentation
  end
  
  def update
    authorize @presentation
    if @presentation.update(presentation_params)
      redirect_to course_presentation_path(@course, @presentation), 
                  notice: 'Presentation was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end
  
  def destroy
    authorize @presentation
    @presentation.destroy
    redirect_to course_presentations_path(@course), 
                notice: 'Presentation was successfully deleted.'
  end
  
  private
  
  def set_presentation
    @presentation = Presentation.find(params[:id])
    @course = @presentation.course
  end
  
  def set_course
    @course = Course.find(params[:course_id]) if params[:course_id]
  end
  
  def presentation_params
    params.require(:presentation).permit(:title, :description, :presentation_date, :course_id)
  end
end 
