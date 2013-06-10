class Task
  include Mongoid::Document
  include Mongoid::Document::Taggable
  
  field :title, type: String
  field :description, type: String
  field :city, type: String
  field :requester_uid, type: String
  
  has_many :references
end
