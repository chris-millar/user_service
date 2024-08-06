class User < ApplicationRecord
  before_save { email.downcase! }
  before_save { profession.downcase! }
end
