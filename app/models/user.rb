class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         # :confirmable, :lockable, :timeoutable, :omniauthable, omniauth_providers: [:twitter]

  has_many :from_messages, class_name: 'Message', foreign_key: 'from_user_id', dependent: :destroy
  has_many :to_messages, class_name: 'Message', foreign_key: 'to_user_id', dependent: :destroy

  # 友達機能(参考：http://www.coma-tech.com/archives/258/)
  has_many :friendships_of_from_user, class_name: 'Friendship', foreign_key: 'from_user_id', dependent: :destroy
  has_many :friendships_of_to_user, class_name: 'Friendship', foreign_key: 'to_user_id', dependent: :destroy
  has_many :friends_of_from_user, :through => :friendships_of_from_user, :source => 'to_user'
  has_many :friends_of_to_user, :through => :friendships_of_to_user, :source => 'from_user'

  def friends
    friends_of_from_user + friends_of_to_user
  end

  def messages
    from_messages + to_messages
  end

end