class AddUniqueIndexToEnrollments < ActiveRecord::Migration[7.1]
  def change
    add_index :enrollments, [:user_id, :course_id], unique: true, 
              name: 'index_enrollments_on_user_id_and_course_id'
  end
end
