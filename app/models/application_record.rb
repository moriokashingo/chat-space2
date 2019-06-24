class ApplicationRecord < ActiveRecord::Base
  # config.autoload_paths += Dir[Rails.root.join('app', 'uploaders')]
  self.abstract_class = true
end
