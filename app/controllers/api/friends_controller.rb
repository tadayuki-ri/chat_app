class Api::FriendsController < ApplicationController
  def index
    # ここで現在のユーザーの友達のみを選別する
    # @current_user_friends = current_user.friends
    # render json: @current_user

    # @current_user_friends = FriendShip.find_by(from_user_id: current_user.id)
    # render json: @current_user_friends

    # とりあえず
    @friends = Friendship.all
    render json: @friends
  end
end