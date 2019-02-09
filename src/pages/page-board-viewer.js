import { html, css } from 'lit-element'
import { PageViewElement } from './page-view-element'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../store'

import '@things-shell/board-viewer'
import './page-toolbar'

class PageBoardViewer extends connect(store)(PageViewElement) {
  constructor() {
    super()

    this.board = ''
    this.provider = null
    this.scene = null

    this.forward = []
    this.backward = []
  }

  static get properties() {
    return {
      board: Object,
      board$: Object,
      provider: Object
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          width: 100%; /* 전체화면보기를 위해서 필요함. */
          overflow: hidden;
        }

        board-viewer {
          flex: 1;
          width: 100%; /* 전체화면보기를 위해서 필요함. */
        }
      `
    ]
  }

  render() {
    return html`
      <page-toolbar>
        <label>${this.board && this.board.name}</label> <span>${(this.board && this.board.description) || ''}</span>
      </page-toolbar>

      <board-viewer .board=${this.board$} .provider=${this.provider}></board-viewer>
    `
  }

  stateChanged(state) {
    if (state.app.page !== 'viewer') {
      this.board$ = null
      this.board = state.board.board

      return
    }

    if (this.board !== state.board.board) {
      this.board = state.board.board
      this.board$ = {
        ...this.board
      }
    }
  }
}

customElements.define('page-board-viewer', PageBoardViewer)
