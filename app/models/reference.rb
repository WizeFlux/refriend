class Reference
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :referencer_uid
  field :referenced_uid
  field :description
  
  belongs_to :task
end
