import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from "@rails/request.js"

export default class extends Controller {
  static targets = ["player", "newSong", "songList", "song"]
  static values = {
    submissionUrl: String
  }

  play(event) {
    const url = event.params.url // click event from clicking on a song

    this.setActiveSong(event.target)
    const currentIndex = Array.from(this.songTargets).indexOf(event.target)
    this.renderPlayer(url, currentIndex)
  }

  next(currentIndex) {
    console.log("Song list length: " + this.songTargets.length)
    console.log("Current index: " + currentIndex)
    if ((currentIndex + 1)>= this.songTargets.length) {
    /*
      We've reached the end of the playlist
      or the currentIndex is somehow out of bounds.
      Either way, don't do anything.
    */
      console.log("🎶🎸🤠 Congrats! You've reached the end of the playlist 💃🏼🎶🔊")
      console.log("How about adding a new song?")
      this.newSongTarget.focus()
      return
    }

    let nextIndex = currentIndex + 1;
    let nextSongElement = this.songTargets[nextIndex]
    let url = nextSongElement.dataset.playlistUrlParam

    this.setActiveSong(nextSongElement)
    this.renderPlayer(url, nextIndex)
  }

  renderPlayer(url, currentIndex) {
    renderReactPlayer(this.playerTarget,
      {
        url,
        playing: true,
        controls: true,
        onEnded: this.next.bind(this, currentIndex),
        onError: this.next.bind(this, currentIndex)
      }
    )
  }

  setActiveSong(songElement) {
    this.songTargets.forEach((element, index) => { element.classList.remove("active") })
    songElement.classList.add("active")
  }

  async addSong() {
    const songUrl = this.newSongTarget.value
    const songList = this.songListTarget

    this.newSongTarget.value = ""

    const request = new FetchRequest('post', this.submissionUrlValue, { body: JSON.stringify({url: songUrl})})
    const response = await request.perform()

    if(response.ok) {
      response.json
        .then(function(data) {
          var node = document.createElement('li')
          node.setAttribute("data-playlist-target", "song")
          node.setAttribute("data-action", "click->playlist#play")
          node.setAttribute("data-playlist-url-param", songUrl)
          node.setAttribute("class", "list-group-item")
          node.appendChild(document.createTextNode(data['title']))
          songList.appendChild(node)
        })
    }
  }

  connect() {
    this.songListTarget.children[0].click()
  }
}
