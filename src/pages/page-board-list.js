/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../store.js'

import { PageViewElement } from './page-view-element.js'

class PageBoardList extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      boards: { type: Array }
    }
  }

  static get styles() {
    return [
      css`
        a {
          display: block;
        }
      `
    ]
  }

  render() {
    return html`
      <nav>
        ${this.boards.map(
          board =>
            html`
              <a href="/viewer/${board.id}">${board.name}</a>
            `
        )}
      </nav>
    `
  }

  stateChanged(state) {
    this.boards = state.board.boards
  }
}

window.customElements.define('page-board-list', PageBoardList)
