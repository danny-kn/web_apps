require 'devise'

# Represents a user in the system - either a student or instructor
class User < ApplicationRecord
  # Include only essential devise modules for login and signup
  devise :database_authenticatable, :registerable, :validatable
         
  # Associations
  has_many :presentations, foreign_key: 'presenter_id'
  has_many :evaluations, foreign_key: 'evaluator_id'
  has_many :received_evaluations, through: :presentations, source: :evaluations
  has_many :enrollments
  has_many :courses, through: :enrollments
  has_many :instructor_courses, class_name: 'Course', foreign_key: 'instructor_id'
  
  # Enums for user roles
  # role: 0 = student, 1 = instructor, 2 = TA
  enum role: { student: 0, instructor: 1, ta: 2 }
  
  # Validations
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  
  # Callbacks
  before_validation :set_default_role
  
  private
  
  def set_default_role
    self.role ||= :student
  end
end 
