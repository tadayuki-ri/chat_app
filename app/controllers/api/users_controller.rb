class Api::UsersController < ApplicationController
  def search
    if params[:name].empty?
      @users = nil
    else
      @users = User.where('name like ?', "#{params[:name]}%")
    end
    render json: @users
  end
end