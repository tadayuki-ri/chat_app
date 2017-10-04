class Api::UsersController < ApplicationController
  # searchアクション：ユーザー検索の際に検索ワードを先頭に含むuser名をjsonで返す
  def search
    if params[:name].empty?
      @users = nil
    else
      @users = User.where('name like ?', "#{params[:name]}%")
    end
    render json: @users
  end
end