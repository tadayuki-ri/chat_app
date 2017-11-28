class Api::MessagesController < ApplicationController

  def index
  end

  def create
  	Message.create(content: params[:message], from_user_id: current_user.id, to_user_id: params[:id])
  	@messages = Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:id],current_user.id).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",current_user.id,params[:id]))
  	render json: @messages
  end

  # pictureアクション(参考：http://www.ckazu.info/blog/2013/12/04/action_dispatch_http_uploded_file/)
  def upload_picture
    Message.create(from_user_id: current_user.id, to_user_id: params[:id], picture: params[:picture].original_filename)
    File.binwrite("public/pictures/#{params[:picture].original_filename}", params[:picture].read)
    @messages = Message.where("(from_user_id = ?) AND (to_user_id = ?)",params[:id],current_user.id).or(Message.where("(from_user_id = ?) AND (to_user_id = ?)",current_user.id,params[:id]))
    render json: @messages
  end

end