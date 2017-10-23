class Api::FriendsController < ApplicationController
  # indexアクション：current_userのfriendsをjson形式で返す
  def index
    @current_user_friends = current_user.friends
    render json: @current_user_friends
  end

  # createアクション：current_userの申請したuserとfrinedshipを作る + indexアクション
  def create
    Friendship.create(from_user_id: current_user.id, to_user_id: params[:friend][:id])
    @current_user_friends = current_user.friends
    render json: @current_user_friends
  end

  # destroyアクション：current_userと選択したuserのfriendshipを削除する + indexアクション
  def destroy
    if Friendship.find_by(from_user_id: params[:friend][:id], to_user_id: current_user.id).nil?
      @destroy_friendship = Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:friend][:id])
    else
      @destroy_friendship = Friendship.find_by(from_user_id: params[:friend][:id], to_user_id: current_user.id)
    end
    @destroy_friendship.destroy
    @current_user_friends = current_user.friends
    render json: @current_user_friends
  end
end


