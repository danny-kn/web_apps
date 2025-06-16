class EnrollmentPolicy < ApplicationPolicy
  def create?
    user.student? && !record.course.students.include?(user)
  end

  def destroy?
    record.user == user
  end

  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end
end 
