# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Grade.destroy_all
Evaluation.destroy_all
Presentation.destroy_all
Enrollment.destroy_all

Course.update_all(instructor_id: nil)
Course.destroy_all

User.destroy_all

users = [
  { email: 'instructor1@example.com', name: 'Instructor 1', role: 1, password: 'password' },
  { email: 'student1@example.com', name: 'Student 1', role: 0, password: 'password' },
  { email: 'student2@example.com', name: 'Student 2', role: 0, password: 'password' }
]
users.each { |user| User.create!(user) }

instructor = User.find_by(email: 'instructor1@example.com')
student1 = User.find_by(email: 'student1@example.com')
student2 = User.find_by(email: 'student2@example.com')

courses = [
  { name: 'Web Apps', code: 'CSE 3901', instructor_id: instructor.id },
  { name: 'Linear Algebra', code: 'MATH 2568', instructor_id: instructor.id }
]
courses.each { |course| Course.create!(course) }

course1 = Course.find_by(code: 'CSE 3901')
course2 = Course.find_by(code: 'MATH 2568')

enrollments = [
  { user_id: student1.id, course_id: course1.id },
  { user_id: student1.id, course_id: course2.id },
  { user_id: student2.id, course_id: course1.id },
  { user_id: student2.id, course_id: course2.id }
]
enrollments.each { |enrollment| Enrollment.create!(enrollment) }

presentations = [
  { title: 'Presentation Evaluator', description: 'Quick demo of the presentation evaluator web app MVP', presentation_date: '2024-12-20', presenter_id: student1.id, course_id: course1.id },
  { title: 'Eigenvalues', description: 'No clue tbh', presentation_date: '2024-12-28', presenter_id: student2.id, course_id: course2.id },
  { title: 'Laplace Transforms', description: 'No clue tbh', presentation_date: '2024-11-28', presenter_id: student2.id, course_id: course2.id }
]
presentations.each { |presentation| Presentation.create!(presentation) }

presentation1 = Presentation.find_by(title: 'Presentation Evaluator')
presentation2 = Presentation.find_by(title: 'Eigenvalues')

evaluations = [
  { score: 4, comments: 'Nice', presentation_id: presentation1.id, evaluator_id: student2.id },
  { score: 1, comments: '?', presentation_id: presentation2.id, evaluator_id: student1.id }
]
evaluations.each { |evaluation| Evaluation.create!(evaluation) }

puts 'Database seeded successfully!'
