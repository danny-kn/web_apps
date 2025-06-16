class DashboardController < ApplicationController
  def index
    @courses = policy_scope(Course)

    if current_user.instructor?
      presentations_from_courses = Presentation.where(course_id: @courses.map(&:id))
      @upcoming_presentations = presentations_from_courses.where('presentation_date >= ?', Date.today)
      past_presentations = presentations_from_courses.where('presentation_date < ?', Date.today)
      @presentations_to_grade = past_presentations.where.missing(:grade)
      @graded_presentations = past_presentations.where.associated(:grade)
    else current_user.instructor?
      # Personal upcoming presentations (where user is the presenter)
      my_presentations = Presentation
        .where(presenter: current_user)
        .order(presentation_date: :asc)

      @my_upcoming_presentations = my_presentations.where('presentation_date >= ?', Date.today)

      @my_past_presentations = my_presentations.where('presentation_date < ?', Date.today) 

      others_presentations = Presentation
        .joins(:course)
        .joins("INNER JOIN enrollments ON enrollments.course_id = courses.id")
        .where(enrollments: { user_id: current_user.id })
        .where.not(presenter: current_user)
        .order(presentation_date: :asc)

      @others_upcoming_presentations = others_presentations
        .where('presentation_date >= ?', Date.today)
      
      # Presentations to review (where user is a student in the course but not the presenter)
      @others_past_presentations = others_presentations 
        .where('presentation_date <= ?', Date.today)

    end
  end
end 
