require 'date'

class Api::MessagesController < ApplicationController
  def index
  	@messages = Message.all
  	render json: @messages
  end

  def create
  	@message = Message.create({
  	  # id: Message.last.id+1,
  	  content: params[:message]
  	  # created_at: Time.now,
  	  # updated_at: Time.now
  	})
  	render json: @message
  end
end