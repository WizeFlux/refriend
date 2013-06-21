class ReferencesController < ApplicationController
  before_filter :find_reference, only: %w(show edit destroy update)
  before_filter :find_task, except: %w(index)
  before_filter :new_reference, only: %w(create new)
  before_filter :find_references, only: %w(index)
  
  def new_reference;    @reference = Reference.new reference_params;  end
  def find_reference;   @reference = Reference.find params[:id];  end
  def find_references;  @references = Reference.all;  end
  def find_task;        @task = (@reference.task if @reference) || Task.find(params[:task_id]);  end
  
  # def update;           @reference.update_attributes(reference_params) ? redirect_to(@task) : render(:edit);  end
  # def destroy;          @reference.destroy ? redirect_to(@task) : render(text: 'faild');  end
  
  def create
    if @reference.save
      redirect_to @task, :notice => {
        referenced_uid: @reference.referenced_uid,
        message: "Рекомендация успешно размещена"
      }
    else
      render :new
    end
  end
  
  def reference_params
    unless params[:reference].blank?
      params.require(
        :reference
      ).permit(
        :description, :referenced_uid
      ).merge(
        referencer_uid: current_person_uid,
        task_id: @task.id
      )
    end
  end
end
