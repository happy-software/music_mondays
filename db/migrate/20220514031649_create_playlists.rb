class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :title
      t.string :magic_link

      t.timestamps
    end
    add_index :playlists, :magic_link
  end
end
