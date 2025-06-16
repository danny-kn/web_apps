class CreateGrades < ActiveRecord::Migration[7.0]
  def change
    create_table :grades do |t|
      t.references :presentation, null: false, foreign_key: true
      t.references :instructor, null: false, foreign_key: { to_table: :users }
      t.decimal :score, precision: 5, scale: 2
      t.text :feedback
      t.timestamps
    end
  end
end 

