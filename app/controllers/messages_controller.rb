class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
  	# idはroot_urlでは表示されないので、デフォルトのcurrent_userメソッドを用いるものとする
  	@user = current_user
  end
end
