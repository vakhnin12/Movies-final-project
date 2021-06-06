import {renderTemplate} from "../utils"

export class Movie {
  constructor(props, json) {
    this.movieHTML = props.movieHTML;
    this.movieJson = json;
    this.json = props.json

    this.movie = renderTemplate(this.movieHTML, this.movieJson);
  }

  render() {
    return this.movie
  }

  onClick() {
    this.movie.addEventListener("click", (event) => {
      const target = event.target;
      if (target.tagName === "BUTTON"){
        target.setAttribute('data-count', +target.getAttribute('data-count')+1)
        if (target.className.includes("like")){
          this.movieJson.like = target.getAttribute("data-count")
        }
        if(!target.className.includes("like")){
          this.movieJson.dislike = target.getAttribute("data-count")
        }
        localStorage.setItem("json", JSON.stringify(this.json))
      }
    })
  }
}