import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from "@rails/request.js"

export default class extends Controller {
  static targets = ["player", "newSong", "songList", "song"]
  static values = {
    submissionUrl: String
  }

  play() {
    var url = event.params.url
    this.songTargets.forEach((element, index) => { element.classList.remove("active") })
    event.srcElement.classList.add("active")
    renderReactPlayer(this.playerTarget, {url, playing: true, controls: true})
  }

  next() {
    console.log("TODO: Update next() in playlist_controller")
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
