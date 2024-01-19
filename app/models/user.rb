class User < ApplicationRecord
  has_secure_password :password, validations: false

  validates :username, presence: true
  validates :username, uniqueness: true

  has_many :posts
  has_many :comments
end
