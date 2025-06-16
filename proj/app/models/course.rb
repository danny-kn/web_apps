class Course < ApplicationRecord
  belongs_to :instructor, class_name: 'User'
  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments, source: :user
  has_many :presentations, dependent: :destroy
  
  validates :name, presence: true
  validates :code, presence: true, uniqueness: true
end 
