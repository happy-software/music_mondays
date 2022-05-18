import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["player", "newSong", "songList", "song"]

  play() {
    console.log("TODO: Update play() in playlist_controller")
    console.log(event.params)
    var url = event.params.url
    renderReactPlayer(this.playerTarget, {url, playing: false, controls: true})
  }

  pause() {
    console.log("TODO: Update pause() in playlist_controller")
  }

  next() {
//    const url = this.songsValue[Math.floor(Math.random() * this.songsValue.length)]
//    renderReactPlayer(this.playerTarget, {url, playing: true})
    console.log("TODO: Update next() in playlist_controller")
  }

  addSong() {
    console.log("TODO: Add new song to playlist here")
    // send a message to the back end to persist it to the playlist
    // update the current list of songs to include the new URL

    var node = document.createElement('li')
    node.setAttribute("data-playlist-target", "song")
    node.setAttribute("data-action", "click->playlist#play")
    node.setAttribute("data-playlist-url-param", this.newSongTarget.value)
    node.appendChild(document.createTextNode(this.newSongTarget.value))

    this.newSongTarget.value = ""
    this.songListTarget.appendChild(node)
  }

  connect() {
  }
}
