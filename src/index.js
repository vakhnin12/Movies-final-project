import 'bootstrap/dist/css/bootstrap.min.css';
import mainHTML from "./main/index.html"
import cardHTML from "./card/card.html";
import movieHTML from "./movie/movie.html";
import modalHTML from "./add-new/add-new.html"
import { MainPage } from "./main/main";
import { createBrowserHistory } from "history";
import { ModalCard } from "./add-new/modal"
import moviesList from "./movies-list.json"
import "./style/style.css";

localStorage.setItem("json", JSON.stringify(moviesList));

function parseFilms(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error("Something went wrong");
    return null;
  }
}

const json = parseFilms(localStorage.getItem("json"))

const history = createBrowserHistory();
document.addEventListener("click", (event) => {
  event.preventDefault()
  if (event.target.tagName === "A") {
    history.push(event.target.href);
  }
})

const props = {
  "mainHTML": mainHTML,
  "cardHTML": cardHTML,
  "movieHTML": movieHTML,
  "modalHTML": modalHTML,
  "json": json,
  "id": "content",
  "linkMoreClass": "more",
  "btnDelete": "btn-delete",
  "btnEdit": "btn-edit",
  "btnSearch": "search",
  "btnAddNew": "add-new",
  "btnSaveFilm": "save-film",
  "hash": "#list",
  "modal": "myModal"
}

const main = new MainPage(props);

document.body.appendChild(main.render());
main.onClick();
main.router()

window.addEventListener("hashchange", () => {
  main.router()
})

const modalCard = new ModalCard(props);
document.body.appendChild(modalCard.render())
modalCard.onClick()