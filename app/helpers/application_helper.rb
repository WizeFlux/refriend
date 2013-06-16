module ApplicationHelper
  def new?
    action_name = 'new'
  end
  
  def edit?
    action_name = 'edit'
  end
  
  def active_if(condition)
    'active' if condition
  end
end
