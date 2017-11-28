class Message < ApplicationRecord
  belongs_to :user

  validate :content_or_picture_cannot_be_nil

  def content_or_picture_cannot_be_nil
    if content.blank? && picture.nil?
  	  errors.add(:content, "please send any message or picture")
    end
  end

end
