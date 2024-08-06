class AddProfessionIndexToUsers < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :profession
  end
end
