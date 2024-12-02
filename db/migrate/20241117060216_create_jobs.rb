class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.string :title, null: false
      t.integer :salary, null:false
      t.integer :category_id, null:false, foreign_key: true

      t.timestamps
    end
  end
end
