class TasksController < ApplicationController
  before_filter :new_task, only: %w(create new)
  before_filter :find_task, only: %w(show edit destroy update)
  before_filter :find_tasks, only: %w(index)

  helper_method :tag_list, :query, :scope, :selected_tags
    
  def new_task;     @task = Task.new task_params;  end
  def find_task;    @task = Task.find params[:id];  end
  def find_tasks;   @tasks = Task.all;  end
  def create;       @task.save ? redirect_to(@task) : render(:new);  end
  def update;       @task.update_attributes(task_params) ? redirect_to(@task) : render(:edit);  end
  def show;         @task.view!;  end
  def destroy;      @task.destroy ? redirect_to(root_url) : render(text: 'faild');  end
  
  def tag_list
    Task.tag_list.collect do |tag|
      {  name: tag, selected: selected_tags.include?(tag)  }
    end
  end
  
  def scope;            (query && query[:scope]) ? query[:scope] : 'all';  end
  def selected_tags;    (query && query[:tags]) ? query[:tags] : [];  end
  def query;            params[:query];  end
  
  def task_params
    unless params[:task].blank?
      params.require(
        :task
      ).permit(
        :title, :description, :tag_list, :cid
      ).merge(
        requester_uid: current_person_uid
      )
    end
  end
end
