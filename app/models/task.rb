class Task
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Document::Taggable
  
  
  
  field :title, type: String
  field :description, type: String
  field :cid, type: String
  field :requester_uid, type: String
  field :views_count, type: Integer, default: 0
  
  def view!;  self.update_attribute(:views_count, views_count + 1);  end
  
  has_many :references, dependent: :destroy
end
