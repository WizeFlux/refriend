class Reference
  include Mongoid::Document
  
  field :referencer_uid
  field :referenced_uid
  field :description
  
  belongs_to :task
end
