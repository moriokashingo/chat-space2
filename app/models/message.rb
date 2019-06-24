class Message < ApplicationRecord
  # config.autoload_paths += Dir[Rails.root.join('app', 'uploaders')]
  mount_uploader :image, ImageUploader
  belongs_to :group
  belongs_to :user
  
  validates :content, presence: true, unless: :image?

end