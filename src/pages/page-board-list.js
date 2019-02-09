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
import './page-toolbar'
import '../components/search-input'

class PageBoardList extends connect(store)(PageViewElement) {
  constructor() {
    super()

    this.keyword = ''
  }

  static get properties() {
    return {
      boards: { type: Array },
      keyword: { type: String }
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;

          overflow: hidden;
        }

        nav {
          flex: 1;

          padding: 16px;
          margin: 0px;
          overflow-y: auto;

          display: grid;

          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-auto-rows: minmax(200px, 220px);
          grid-gap: 16px;
        }

        a {
          padding: 5px 5px 0 5px;
          margin: 0;
          height: 100%;
          background-color: lightgray;
          color: navy;
          font-size: 0.8em;
        }

        img {
          display: block;
          height: 88%;
          max-width: 100%;
          margin: auto;
        }
      `
    ]
  }

  render() {
    return html`
      <page-toolbar>
        <search-input .value=${this.keyword} label="search"> </search-input>
      </page-toolbar>

      <nav>
        ${this.boards.map(
          board =>
            html`
              <a href="/viewer/${board.id}">
                <img src=${this.thumbnail(board)} />
                ${board.name} <span>${board.description}</span>
              </a>
            `
        )}
      </nav>
    `
  }

  stateChanged(state) {
    this.boards = state.board.boards
  }

  thumbnail(board) {
    return board.thumbnail || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  }
}

window.customElements.define('page-board-list', PageBoardList)
