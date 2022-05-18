class Playlist < ApplicationRecord
  validates :title, presence: true

  has_many :songs

  def song_urls
    songs.pluck(:song_url)
  end
end
