class TasksController < ApplicationController
  before_filter :new_task, only: %w(create new)
  before_filter :find_task, only: %w(show edit destroy update)
  before_filter :find_tasks, only: %w(index)
  
  def new_task;     @task = Task.new task_params;  end
  def find_task;    @task = Task.find params[:id];  end
  def find_tasks;   @tasks = Task.all;  end
  def create;       @task.save ? redirect_to(@task) : render(:new);  end
  def update;       @task.update_attributes(task_params) ? redirect_to(@task) : render(:edit);  end
  
  def task_params
    unless params[:task].blank?
      params.require(
        :task
      ).permit(
        :title, :description, :tags, :city
      ).merge(
        requester_uid: current_person_uid
      )
    end
  end
end
