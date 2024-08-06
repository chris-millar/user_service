class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :profession
      t.string :country
      t.string :city

      t.timestamps
    end
  end
end
