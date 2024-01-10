class RenameEmailToUsername < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :email, :username
  end
end
