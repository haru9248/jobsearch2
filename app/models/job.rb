class Job < ApplicationRecord
  belongs_to :category
  
  validates :title, presence: true
  validates :salary, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :category_id, presence: true
end
