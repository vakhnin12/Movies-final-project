import $ from "jquery";

export class ModalCard {
    constructor(props) {
        this.modalHTML = props.modalHTML;
        this.json = props.json;
        this.modal = props.modal;
        this.btnSaveFilm = props.btnSaveFilm
    }
    render() {
        const container = document.createElement("div");
        container.innerHTML = this.modalHTML;
        return container.firstChild
    }
    onClick() {
        const modal = document.getElementById(this.modal);

        modal.addEventListener("click", (event) => {
            const target = event.target;

            if (target.id === this.btnSaveFilm) {
                const newMovie = {};
                modal.querySelectorAll('[data-input="true"]').forEach(elem => {
                    newMovie[elem.dataset.id] = elem.value ? elem.value : "unknown";
                    if (newMovie.photo === "unknown") {
                        newMovie.photo = "https://st4.depositphotos.com/2381417/26959/i/600/depositphotos_269592714-stock-photo-no-thumbnail-image-placeholder-for.jpg"
                    }
                    if (elem.dataset.id === "actors") {
                        newMovie.actors = [];
                        newMovie.actors.push(elem.value)
                    }
                });

                newMovie.id = String(Math.floor(Math.random() * 1000000) + 1);
                newMovie.like = "0";
                newMovie.dislike = "0";

                this.json.push(newMovie);
                localStorage.setItem("json", JSON.stringify(this.json));
                window.location.hash = "list"
                $('#' + this.modal).modal('hide')
            }
        })
    }
}