class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.datetime :from_date
      t.datetime :to_date
      t.string :title
      t.text :description
      t.decimal :latitude, precision: 15, scale: 10, default: 0.0
      t.decimal :longitude, precision: 15, scale: 10, default: 0.0
      t.integer :user_id
      t.timestamps
    end
  end
end
