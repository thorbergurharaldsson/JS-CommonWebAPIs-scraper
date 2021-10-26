import abstractView from "./abstractView.js";

export default class extends abstractView {
  constructor(params) {
    super(params);
    this.setTitle("JS News scraper");
  }

  async getHTML() {
    return /*html */ `
        <a href="/visir" class="navLink" data-link>scrape news from visir.is</a>
        <a href="/ruv" class="navLink" data-link>scrape news from ruv.is</a>
    `;
  }
}
