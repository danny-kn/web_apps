# Represents a student presentation that can be evaluated
class Presentation < ApplicationRecord
  # Associations
  belongs_to :presenter, class_name: 'User', foreign_key: 'presenter_id'
  belongs_to :course
  has_many :evaluations, dependent: :destroy
  has_one :grade
  
  # Validations
  validates :title, presence: true
  validates :presentation_date, presence: true
  validates :presenter_id, presence: true
  
  validate :presenter_must_be_student
  
  # Make can_be_evaluated_by? public
  def can_be_evaluated_by?(user)
    result = user.present? && user != presenter && presentation_date <= Date.current
    puts "can_be_evaluated_by? result: #{result}"
    result
  end
  
  def average_score
    evaluations.average(:score)
  end
  
  def total_evaluations
    evaluations.count
  end
  
  private
  
  # Custom validation to ensure only students can present
  def presenter_must_be_student
    if presenter && !presenter.student?
      errors.add(:presenter, "must be a student")
    end
  end
end 
