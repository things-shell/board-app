import { html } from 'lit-element'

import { PageViewElement } from './page-view-element.js'

class Page404 extends PageViewElement {
  static get styles() {
    return []
  }

  render() {
    return html`
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>
          The page you're looking for doesn't seem to exist. Head back
          <a href="/">home</a> and try again?
        </p>
      </section>
    `
  }
}

window.customElements.define('page-404', Page404)
