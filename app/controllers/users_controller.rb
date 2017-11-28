class UsersController < ApplicationController
  def index
  end

  def show
  	@user = User.find(params[:id])
  end

  def search
  	@user = current_user
  end
end
