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
    @playlist.songs.create(song_url: params[:url])
  end

  private

  def playlist_params
    params.require(:playlist).permit(:title)
  end

  def set_playlist
    @playlist = Playlist.find(params[:id])
  end
end
