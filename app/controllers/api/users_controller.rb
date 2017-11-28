class Api::UsersController < ApplicationController

  def search
    if params[:name].blank?
      @users = []
    else
      @users = User.where.not(name: current_user.name).where('name like ?', "#{params[:name]}%")
    end
    render json: @users
  end

  def show
    @messages = current_user.from_messages.where(to_user_id: params[:id]) | current_user.to_messages.where(from_user_id: params[:id])
    render json: @messages
  end

end
