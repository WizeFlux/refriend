module ApplicationHelper
  def new?
    action_name = 'new'
  end
  
  def edit?
    action_name = 'edit'
  end
end
