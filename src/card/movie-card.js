import { renderTemplate } from "../utils";
import { Movie } from "../movie/movie";
import { MainPage } from "../main/main"

export class MovieCard {
  constructor(props, e) {
    this.card = props.cardHTML;
    this.linkMore = props.linkMoreClass;
    this.jsonFilmCard = e;
    this.contentid = props.id;
    this.json = props.json;
    this.btnDelete = props.btnDelete;
    this.btnEdit = props.btnEdit
    this.props = props;
    this.modal = props.modal

    this.movieCard = renderTemplate(this.card, this.jsonFilmCard);
  };

  onClick() {
    this.movieCard.addEventListener("click", (event) => {
      const main = new MainPage(this.props);
      const target = event.target;
      const content = document.getElementById(this.contentid);
      const buttonDelete = this.movieCard.getElementsByTagName("BUTTON").namedItem(this.btnDelete);
      const buttonEdit = this.movieCard.getElementsByTagName("BUTTON").namedItem(this.btnEdit);

      if (target === buttonDelete || target === buttonDelete.firstChild || target === buttonDelete.firstChild.firstChild) {
        const confirmDelete = confirm("Delete Movie");
        if (confirmDelete === true) {
          this.json.splice(this.json.indexOf(this.jsonFilmCard), 1);
          localStorage.setItem("json", JSON.stringify(this.json));

          main.router()
        }
      };
      if (target === buttonEdit || target === buttonEdit.firstChild || target === buttonEdit.firstChild.firstChild) {
        const modalCard = document.getElementById(this.modal);

        window.location.hash = "edit-movie"
        $('#' + this.modal).modal('show');
        for (const key in this.jsonFilmCard) {
          modalCard.querySelectorAll('[data-input="true"]').forEach(elem => {
            if (key === elem.dataset.id) {
              elem.value = this.jsonFilmCard[key]
            }
          })
        }
        this.json.splice(this.json.indexOf(this.jsonFilmCard), 1);
      };
      if (target.className === this.linkMore) {
        content.innerHTML = "";

        const fullMovie = new Movie(this.props, this.jsonFilmCard);
        fullMovie.onClick();
        content.appendChild(fullMovie.render());
      };
    })
  };

  render() {
    return this.movieCard;
  }
}