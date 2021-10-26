import abstractView from "./abstractView.js";
import { getItems } from "../getItems.js";

const cards = document.querySelector(".content");

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async getHTML() {
    getItems("/visir").then((result) => {
      result.forEach((e) => {
        const title = e.title;
        const href = e.href;
        const img = e.img;

        console.log(title, href, img);
        cards.insertAdjacentHTML(
          "beforeend",
          /*html*/
          `
            <div class="card">
              <a href="${href}"><img src="${img}" alt="" /></a>
              
              <div class="container">
                <h3><b><a href="${href}">${title}</a></b></h3>
              </div>
            </div>
          `
        );
      });
    });
  }
}
