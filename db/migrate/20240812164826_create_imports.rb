class CreateImports < ActiveRecord::Migration[7.1]
  def change
    create_table :imports do |t|
      t.string :filename
      t.integer :record_count
      t.string :status
      t.datetime :performed_at

      t.timestamps
    end
  end
end
