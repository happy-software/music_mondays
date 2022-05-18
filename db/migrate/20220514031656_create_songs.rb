class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.references :playlist, null: false, foreign_key: true
      t.string :song_url
      t.string :song_source

      t.timestamps
    end
    add_index :songs, :song_source
  end
end
