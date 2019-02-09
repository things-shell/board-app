import { html, css } from 'lit-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../store'

import '@things-shell/board-player'
import './page-toolbar'

import { PageViewElement } from './page-view-element.js'

class PageBoardPlayer extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      // statePath: 'app.page'
      page: String,
      // statePath: 'board.boards'
      boards: Array,
      boards$: Array,

      transition: String,
      playtime: Number,
      columns: Number,
      rows: Number,
      provider: Object,
      started: Boolean
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;

          overflow: hidden;
        }

        board-player {
          flex: 1;
        }
      `
    ]
  }

  constructor() {
    super()

    this.transition = 'carousel'
    this.playtime = 30
    this.columns = 1
    this.rows = 1
    this.started = false
  }

  stateChanged(state) {
    this.boards = state.board.boards
    this.page = state.app.page
  }

  updated(change) {
    if (change.has('page') && this.page !== 'player') {
      this.boards$ = []
    }
    if (change.has('boards') && this.page == 'player') {
      this.boards$ = this.boards
    }
  }

  render() {
    return html`
      <page-toolbar>
        <label>transition</label>
        <select .value=${this.transition} @change=${e => (this.transition = e.target.value)}>
          ${['carousel', 'flip-card', 'flip-card2', 'enlarge-grid'].map(
            transition => html`
              <option>${transition}</option>
            `
          )}
        </select>
        <label>playtime</label>
        <select .value=${this.playtime} @change=${e => (this.playtime = e.target.value)}>
          ${[10, 30, 60, 300, 600].map(
            playtime => html`
              <option>${playtime}</option>
            `
          )}
        </select>
        <label>rows</label>
        <select .value=${this.rows} @change=${e => (this.rows = e.target.value)}>
          ${[1, 2, 3, 4, 5].map(
            row => html`
              <option>${row}</option>
            `
          )}
        </select>
        <label>columns</label>
        <select .value=${this.columns} @change=${e => (this.columns = e.target.value)}>
          ${[1, 2, 3, 4, 5].map(
            column => html`
              <option>${column}</option>
            `
          )}
        </select>
      </page-toolbar>

      <board-player
        .boards=${this.boards$}
        .playtime=${this.playtime}
        .transition=${this.transition}
        .rows=${this.rows}
        .columns=${this.columns}
        .provider=${this.provider}
      ></board-player>
    `
  }
}

customElements.define('page-board-player', PageBoardPlayer)
