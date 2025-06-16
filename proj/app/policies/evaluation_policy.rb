class EvaluationPolicy < ApplicationPolicy
  def index?
    user.instructor? || record.first&.presentation&.presenter == user
  end

  def create?
    record.presentation.can_be_evaluated_by?(user)
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end 
