# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_12_04_004813) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "courses", force: :cascade do |t|
    t.string "name", null: false
    t.string "code", null: false
    t.bigint "instructor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["instructor_id"], name: "index_courses_on_instructor_id"
  end

  create_table "enrollments", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_enrollments_on_course_id"
    t.index ["user_id", "course_id"], name: "index_enrollments_on_user_id_and_course_id", unique: true
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "evaluations", force: :cascade do |t|
    t.integer "score"
    t.text "comments"
    t.bigint "presentation_id"
    t.bigint "evaluator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["evaluator_id"], name: "index_evaluations_on_evaluator_id"
    t.index ["presentation_id"], name: "index_evaluations_on_presentation_id"
  end

  create_table "grades", force: :cascade do |t|
    t.bigint "presentation_id", null: false
    t.bigint "instructor_id", null: false
    t.decimal "score", precision: 5, scale: 2
    t.text "feedback"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["instructor_id"], name: "index_grades_on_instructor_id"
    t.index ["presentation_id"], name: "index_grades_on_presentation_id"
  end

  create_table "presentations", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.date "presentation_date"
    t.bigint "presenter_id"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_presentations_on_course_id"
    t.index ["presenter_id"], name: "index_presentations_on_presenter_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "name"
    t.integer "role", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "courses", "users", column: "instructor_id"
  add_foreign_key "enrollments", "courses"
  add_foreign_key "enrollments", "users"
  add_foreign_key "evaluations", "presentations"
  add_foreign_key "evaluations", "users", column: "evaluator_id"
  add_foreign_key "grades", "presentations"
  add_foreign_key "grades", "users", column: "instructor_id"
  add_foreign_key "presentations", "courses"
  add_foreign_key "presentations", "users", column: "presenter_id"
end
