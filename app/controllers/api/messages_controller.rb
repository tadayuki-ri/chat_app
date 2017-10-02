class Api::MessagesController < ApplicationController
  def index
    # Messageモデルからのデータの取得
  	@messages = Message.all
  	render json: @messages
  end

  def create
  	@message = Message.create(content: params[:message])
  	render json: @message
  end
end