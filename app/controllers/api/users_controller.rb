class Api::UsersController < ApplicationController
  # searchアクション：ユーザー検索の際に検索ワードを先頭に含むuser名をjsonで返す
  def search
  	# params[:name].empty?だとundefined method `empty?' for nil:NilClassのエラーが発生する
    if params[:name].blank?
      @users = nil
    else
   	  # current_user含めすべてのユーザーを返す場合
      # @users = User.where('name like ?', "#{params[:name]}%")
      # current_userを除く場合
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

  # def index
  # 	# 参考：https://qiita.com/QUANON/items/0033a5adb76d0cb963cd
  # 	@messages = Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:id],current_user.id).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",current_user.id,params[:id]))
  # 	render json: @messages
  # end

end