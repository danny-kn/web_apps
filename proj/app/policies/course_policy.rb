class CoursePolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.instructor?
  end

  def update?
    user.instructor? && record.instructor == user
  end

  def destroy?
    update?
  end

  class Scope < Scope
    def resolve
      if user.instructor?
        scope.where(instructor: user)
      else
        scope.joins(:enrollments).where(enrollments: { user: user })
      end
    end
  end
end 
