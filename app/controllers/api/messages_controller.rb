class Api::MessagesController < ApplicationController
  # def index
  #   # Messageモデルからのデータの取得
  #   # 全てのmessageを取得する場合
  # 	# @messages = Message.all
  # 	# current_userのmessageのみ取得する場合
  # 	# @messages = params[:friend]
  # 	# @messages = Message.where("(from_user_id = ?) OR (to_user_id = ?)", current_user.id, current_user.id)

  # 	# @messages = Message.where(from_user_id: params[:friend][:id]) 
  # 	# @messages = Message.where("(from_user_id = ?) OR (to_user_id = ?)", current_user.id, params[:friend][:id])

  # 	# 参考：https://qiita.com/QUANON/items/0033a5adb76d0cb963cd
  # 	@messages = Message.where("(from_user_id =_?) AND (to_user_id = ?)",current_user.id,params[:friend][:id]).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:friend][:id],current_user.id))
  # 	render json: @messages
  # 	# render json: @messages
  # end

  def index
  	# 参考：https://qiita.com/QUANON/items/0033a5adb76d0cb963cd
  	@messages = Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:id],current_user.id).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",current_user.id,params[:id]))
  	render json: @messages
  end

  # def create
  # 	@message = Message.create(content: params[:message])
  # 	render json: @message
  # end

  def create
  	@message = Message.create(content: params[:message], from_user_id: current_user.id, to_user_id: params[:id])
  	@messages = Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:id],current_user.id).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",current_user.id,params[:id]))
  	render json: @messages
  end

end