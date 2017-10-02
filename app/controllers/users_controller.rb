class UsersController < ApplicationController
  before_action :authenticate_user!
  
  def index
  end

  def show
  	@user = User.find(params[:id])
  end

  def search
  	@user = current_user
  end
end
