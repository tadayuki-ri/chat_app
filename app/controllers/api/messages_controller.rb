class Api::MessagesController < ApplicationController
  # indexアクション：Messageモデルからcurrent_userと洗濯したuserとのメッセージをjson形式で返す
  def index
  	# 参考：https://qiita.com/QUANON/items/0033a5adb76d0cb963cd
  	@messages = Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:id],current_user.id).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",current_user.id,params[:id]))
  	render json: @messages
  end

  # createアクション：current_userのmessageをMessageモデルに保存 ＋ indexアクション
  def create
  	Message.create(content: params[:message], from_user_id: current_user.id, to_user_id: params[:id])
  	@messages = Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:id],current_user.id).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",current_user.id,params[:id]))
  	render json: @messages
  end

  # pictureアクション：current_userのuploadしたpictureをMessageモデルのpictureカラムに名前だけ保存&publicファイルのpictureフォルダに保存 ＋ indexアクション
  # 参考：http://www.ckazu.info/blog/2013/12/04/action_dispatch_http_uploded_file/
  def picture
    Message.create(from_user_id: current_user.id, to_user_id: params[:id], picture: params[:picture].original_filename)
    File.binwrite("public/pictures/#{params[:picture].original_filename}", params[:picture].read)
    @messages = Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:id],current_user.id).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",current_user.id,params[:id]))
    render json: @messages
  end

end