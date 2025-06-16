class CreateInitialTables < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :name
      t.integer :role, default: 0
      t.timestamps
    end
    
    create_table :courses do |t|
      t.string :name, null: false
      t.string :code, null: false
      t.references :instructor, foreign_key: { to_table: :users }
      t.timestamps
    end
    
    create_table :presentations do |t|
      t.string :title, null: false
      t.text :description
      t.date :presentation_date
      t.references :presenter, foreign_key: { to_table: :users }
      t.references :course, foreign_key: true
      t.timestamps
    end
    
    create_table :evaluations do |t|
      t.integer :score
      t.text :comments
      t.references :presentation, foreign_key: true
      t.references :evaluator, foreign_key: { to_table: :users }
      t.timestamps
    end
    
    create_table :enrollments do |t|
      t.references :user, foreign_key: true
      t.references :course, foreign_key: true
      t.timestamps
    end
  end
end 
