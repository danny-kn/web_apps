class PresentationPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.instructor? || user.student?
  end

  def update?
    user.instructor? || record.presenter == user
  end

  def destroy?
    user.instructor? || record.presenter == user
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end 
