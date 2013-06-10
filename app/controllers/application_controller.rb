class ApplicationController < ActionController::Base
  before_filter :set_headers, :current_person_uid, :current_person_cid
  protect_from_forgery with: :exception
  helper_method :current_person_uid, :current_person_cid
  
  
  
  def set_headers
    response.headers['X-FRAME-OPTIONS'] = nil
  end
  
  def current_person_cid
    if params[:cid]
      session[:city_id] = params[:cid]
    else
      session[:city_id]
    end
  end
  
  def current_person_uid
    session[:viewer_id] ||= params[:viewer_id]
  end
end
