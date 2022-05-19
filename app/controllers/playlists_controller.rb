class PlaylistsController < ApplicationController
  before_action :set_playlist, only: [:show, :add_song]

  def new
    @playlist = Playlist.new
  end

  def create
    @playlist = Playlist.new(title: playlist_params[:title])

    if @playlist.save
      redirect_to @playlist
    else
      render :new
    end
  end

  def index
  end

  def show
    @songs = @playlist.song_urls
  end

  def add_song
    url = params[:url]
    song_id = youtube_id(url)
    Rails.logger.info("Given URL(#{url}) -- extracted ID(#{song_id})")
    title = Yt::Video.new(id: song_id).title
    @playlist.songs.create(song_url: url, title: title)
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title)
  end

  def set_playlist
    @playlist = Playlist.find(params[:id])
  end

  def youtube_id(youtube_url)
    # Found online at https://gist.github.com/niquepa/4c59b7d52a15dde2367a
    regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    match = regex.match(youtube_url)
    if match && !match[1].blank?
      match[1]
    else
      nil
    end
  end
end
