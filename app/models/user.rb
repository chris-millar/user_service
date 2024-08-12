class User < ApplicationRecord
  belongs_to :import

  before_save { email.downcase! }
  before_save { profession.downcase! }
end
