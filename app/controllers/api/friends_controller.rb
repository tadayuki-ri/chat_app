class Api::FriendsController < ApplicationController
  def index
    # 現在のuserのfriendsだけをjson形式で返す
    @current_user_friends = current_user.friends
    render json: @current_user_friends
    # その他の方法として @current_user_friends = Friendship.find_by(from_user_id: current_user.id + to_user_id: current_user.id)などもアイデアの一つ
  end

  def create
    # parameterで渡される情報は入れ子ハッシュになっているので、id情報はparams[:friend][:id]で取得
    @friendship = Friendship.create(from_user_id: current_user.id, to_user_id: params[:friend][:id])
    render json: @friendship
  end

end
