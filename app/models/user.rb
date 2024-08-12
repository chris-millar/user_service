class User < ApplicationRecord
  belongs_to :import, optional: true

  before_save { email.downcase! }
  before_save { profession.downcase! }
end
