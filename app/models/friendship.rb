class Friendship < ApplicationRecord
  belongs_to :from_user, class_name: "User"
  belongs_to :to_user, class_name: "User"
  # from_user_idとto_user_idのペアの重複をなくすvalidation
  validates :from_user_id, :uniqueness => {:scope => :to_user_id}
  validate :users_are_not_already_friends

  # friendshipの友達だった場合に友達関係を追加しない機能(参考：https://stackoverflow.com/questions/29123620/rails-validate-unique-friendship-relationships)
  def users_are_not_already_friends
    combinations = [
      "from_user_id = #{from_user_id} AND to_user_id = #{to_user_id}",
      "from_user_id = #{to_user_id} AND to_user_id= #{from_user_id}"
    ]
    if Friendship.where(combinations.join(' OR ')).exists?
      self.errors.add(:from_user_id, 'Already friends!')
    end
  end

end