class Task
  include Mongoid::Document
  field :title, type: String
  field :description, type: String
  field :tags, type: String
  field :city, type: String
  field :requester_uid, type: String
  
  has_many :references
end
