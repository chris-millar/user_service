class AddImportIdToUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :import, foreign_key: true, index: true, null: true
  end
end
