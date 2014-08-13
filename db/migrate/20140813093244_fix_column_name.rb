class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :events, :title, :style
  end
end
