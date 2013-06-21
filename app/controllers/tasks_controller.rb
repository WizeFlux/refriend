class TasksController < ApplicationController
  before_filter :new_task, only: %w(create new)
  before_filter :find_task, only: %w(show edit destroy update)
  before_filter :find_tasks, only: %w(index json)
  protect_from_forgery except: %w(json)
  helper_method :tag_list, :query, :scope, :selected_tags
    
  def new_task;     @task = Task.new task_params;  end
  def find_task;    @task = Task.find params[:id];  end
  def create;       @task.save ? redirect_to(@task) : render(:new);  end
  def update;       @task.update_attributes(task_params) ? redirect_to(root_url(query: {scope: 'own'})) : render(:edit);  end
  def show;         @task.view!;  end
  def destroy;      @task.destroy ? redirect_to(root_url(query: {scope: 'own'})) : render(text: 'faild');  end
  
  def json
    render json: {
      pagination: {
        pages: @tasks.total_pages,
        page: @tasks.current_page
      }, 
      tasks: @tasks.map{|t| {
        requester_uid: t.requester_uid,
        time: t.created_at.strftime('%H:%M'),
        date: t.created_at.strftime('%d/%m/%y'),
        title: t.title,
        cid: t.cid,
        id: t.id,
        tags: t.tags,
        views_count: t.views_count,
        references_count: t.references.count
      }}
    }.to_json
  end
  
  def find_tasks
    @tasks = Task.page(params[:page]).per(7)
    @tasks = @tasks.tagged_with_all(selected_tags) unless selected_tags.blank?
    @tasks = @tasks.where(cid: cid) if cid
    @tasks = @tasks.where(requester_uid: current_person_uid) if scope == 'own'
  end
  
  def tag_list
    Task.tag_list
  end
  
  
  def cid;              (query && query[:cid]) ? query[:cid] : nil;  end
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
