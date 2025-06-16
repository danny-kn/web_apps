class Grade < ApplicationRecord
  belongs_to :presentation
  belongs_to :instructor, class_name: 'User'
  
  validates :score, presence: true, 
            numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :feedback, presence: true
  validates :instructor, presence: true
  
  # Ensure only one grade per presentation
  validates :presentation_id, uniqueness: true
end 
