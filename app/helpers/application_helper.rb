module ApplicationHelper
  def new?
    action_name = 'new'
  end
  
  def edit?
    action_name = 'edit'
  end
  
  def active_if(condition)
    condition ? ' active' : ''
  end
end
