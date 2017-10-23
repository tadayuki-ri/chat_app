class Api::UsersController < ApplicationController
  # searchアクション：ユーザー検索の際に検索ワードを先頭に含むuser名をjsonで返す
  def search
    if params[:name].blank?
      @users = nil
    else
      # current_userを除いたすべてのユーザーを返す場合
      users = User.where('name like ?', "#{params[:name]}%")
      @users = []
      users.each do |user|
      	if user != current_user
          @users.push(user)
      	end
      end
    end
    render json: @users
  end

end