# Represents an evaluation submitted by a user for a presentation
class Evaluation < ApplicationRecord
  # Associations
  belongs_to :presentation
  belongs_to :evaluator, class_name: 'User'
  
  # Validations
  validates :score, presence: true, inclusion: { in: 1..5 }
  validates :comments, presence: true
  
  validate :evaluator_cannot_be_presenter
  
  private
  
  # Prevents presenters from evaluating their own presentations
  # @raise [ActiveRecord::RecordInvalid] if evaluator is the presenter
  def evaluator_cannot_be_presenter
    if evaluator == presentation.presenter
      errors.add(:base, "You cannot evaluate your own presentation")
    end
  end
end 
