class AddTitleToSong < ActiveRecord::Migration[7.0]
  def change
    add_column :songs, :title, :string
  end
end
