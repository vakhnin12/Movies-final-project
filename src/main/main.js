import { MovieCard } from "../card/movie-card";
import { Movie } from "../movie/movie"
import bootstrap from "bootstrap"
import $ from "jquery"

export class MainPage {
  constructor(props) {
    this.main = props.mainHTML;
    this.contentid = props.id;
    this.json = props.json;
    this.props = props;
    this.hash = props.hash;
    this.btnSearch = props.btnSearch;
    this.btnAddNew = props.btnAddNew;
    this.modal = props.modal
  }

  render() {
    const container = document.createElement("div");
    container.innerHTML = this.main;

    return container.firstChild;
  }

  router() {
    const content = document.getElementById(this.contentid)
    if (window.location.hash === this.hash) {
      content.innerHTML = "";
      this.json.forEach((e) => {
        const movieCard = new MovieCard(this.props, e);
        movieCard.onClick()
        content.appendChild(movieCard.render());
      });
    };
    this.json.forEach((e) => {

      if (window.location.hash === String(this.hash + "-" + (e.id))) {
        content.innerHTML = "";

        const fullMovie = new Movie(this.props, e);
        fullMovie.onClick();
        content.appendChild(fullMovie.render())
      }
    });
  }

  onClick() {
    const content = document.getElementById(this.contentid);
    const nav = document.getElementById("navbarSupportedContent");

    nav.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target;
      if (target.hash === this.hash) {
        window.location.hash = this.hash
      };

      const input = nav.querySelector("INPUT");
      const inputValue = input.value
      const buttonSearch = document.getElementsByTagName("BUTTON").namedItem(this.btnSearch);
      if (target === buttonSearch || target === buttonSearch.firstChild || target === buttonSearch.firstChild.firstChild) {
        window.location.hash = "search"
        content.innerHTML = "";
        this.json.forEach((e) => {
          if (e.name.toLowerCase().includes(inputValue)) {
            const movieCard = new MovieCard(this.props, e);
            content.appendChild(movieCard.render());
            movieCard.onClick()
          }
        })
        // input.value = ""
        if(content.innerHTML === ""){
          content.innerHTML = "Извините такого фильма нет!"
        }
      };
      if (target.id === this.btnAddNew) {
        window.location.hash = this.btnAddNew;
        $('#' + this.modal).modal('show');
        const modalCard = document.getElementById(this.modal);
        modalCard.querySelectorAll('[data-input="true"]').forEach(e => {
          e.value = ""
        })
      }
    });
  }
}