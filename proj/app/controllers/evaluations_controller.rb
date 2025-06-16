class EvaluationsController < ApplicationController
  before_action :set_presentation
  
  def index
    @evaluations = policy_scope(@presentation.evaluations)
    authorize @evaluations
  end
  
  def create
    @evaluation = @presentation.evaluations.new(evaluation_params)
    @evaluation.evaluator = current_user
    authorize @evaluation
    
    if @evaluation.save
      redirect_to course_presentation_path(@presentation.course, @presentation), 
                  notice: 'Evaluation was successfully submitted.'
    else
      redirect_to course_presentation_path(@presentation.course, @presentation), 
                  alert: @evaluation.errors.full_messages.join(", ")
    end
  end
  
  private
  
  def set_presentation
    @presentation = Presentation.find(params[:presentation_id])
  end
  
  def evaluation_params
    params.require(:evaluation).permit(:score, :comments)
  end
end 
