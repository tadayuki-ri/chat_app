class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         # :confirmable, :lockable, :timeoutable, :omniauthable, omniauth_providers: [:twitter]

  # 友達機能
  # 参考：http://www.coma-tech.com/archives/258/
  has_many :friendships_of_from_user, class_name: 'Friendship', foreign_key: 'from_user_id', dependent: :destroy
  has_many :friendships_of_to_user, class_name: 'Friendship', foreign_key: 'to_user_id', dependent: :destroy
  has_many :friends_of_from_user, :through => :friendships_of_from_user, :source => 'to_user'
  has_many :friends_of_to_user, :through => :friendships_of_to_user, :source => 'from_user'

  # 友達を全部返す
  def friends
     friends_of_from_user + friends_of_to_user
  end

  # 友達申請する
  def friend_request(other_user)
  	friendships_of_from_user.create(to_user_id: other_user.id)
  end

  # 友達拒否する
  def friend_refuse(other_user)
  	friendships_of_from_user.find_by(to_user_id: other_user.id).destroy
  end

  # 友達関係であったらtrueを返す
  def friend?(other_user)
  	friends_of_from_user.include?(other_user)
  end

end
