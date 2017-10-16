class AddColumnsToMessages < ActiveRecord::Migration[5.0]
  def change
  	add_column :messages, :from_user_id, :integer
  	add_column :messages, :to_user_id, :integer
  end
end
