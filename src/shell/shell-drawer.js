import { LitElement, html, css } from 'lit-element'
import '@material/mwc-icon/mwc-icon'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../store'
import { updateDrawerState } from '../actions/app'

import { CLEAR_BOARD_LIST, SET_CURRENT_BOARD } from '../actions/board'
import { fetchGroupList, CLEAR_GROUP_LIST } from '../actions/group'
import { fetchPlayGroupList, CLEAR_PLAYGROUP_LIST } from '../actions/play-group'

import { menuIcon } from '../components/my-icons.js'

class ShellDrawer extends connect(store)(LitElement) {
  constructor() {
    super()

    this.boardGroupList = []
    this.boardPlayGroupList = []
    this.boardGroupCurrent = {}
  }

  static get properties() {
    return {
      boardGroupList: Array,
      boardPlayGroupList: Array,
      boardGroupCurrent: Object,

      started: Boolean
    }
  }

  static get styles() {
    return [
      css`
        :host {
          position: relative;
          display: flex;
          flex-direction: column;
          background-color: var(--primary-dark-color);
        }
        *:focus {
          outline: none;
        }

        app-toolbar {
          background-color: var(--primary-dark-color);
          justify-content: space-between;
          height: 45px;
          padding: 0;
          color: var(--third-color);
        }

        app-toolbar.setting-menu {
          padding: 0 4px 0 4px;
          background-color: var(--primary-dark-color);
        }

        a,
        a:link,
        a:visited {
          text-decoration: none;
          color: var(--third-color);
        }

        [logo] {
          width: 45px;
          height: 45px;
        }

        [main-title] {
          height: 45px;
          min-height: 45px;
          padding-left: 9px;
          color: var(--third-color);
          text-transform: capitalize;
          font-size: 22px;
          font-weight: normal;
          line-height: 2.1;
        }
      `
    ]
  }

  render() {
    return html`
      <app-toolbar>
        <button @click="${this.onDrawerCollapse}" logo>${menuIcon}</button>
        <h3 main-title>Board Viewer</h3>
      </app-toolbar>

      <nav>
        <a href="/list-recent">List Recent</a>
        ${this.boardGroupList.map(
          item => html`
            <div>
              <a href="/list-by-group/${item.id}">${item.name}</a>
            </div>
          `
        )}
        ${this.boardPlayGroupList.map(
          item => html`
            <div>
              <a href="/list-by-playgroup/${item.id}">${item.name}</a>
              <a href="/player/${item.id}"><mwc-icon>play_arrow</mwc-icon></a>
            </div>
          `
        )}
      </nav>
    `
  }

  stateChanged(state) {
    this.boardGroupList = state.board.groups
    this.boardPlayGroupList = state.board.playGroups
    this.boardGroupCurrent = state.board.group
  }

  shouldUpdate() {
    return this.started
  }

  updated(change) {
    if (change.has('started')) {
      if (this.started) {
        this.updateGroupList()
      } else {
        this.clearGroupList()
      }
    }
  }

  updateGroupList() {
    store.dispatch(fetchGroupList())
    store.dispatch(fetchPlayGroupList())
  }

  clearGroupList() {
    store.dispatch({
      type: CLEAR_GROUP_LIST
    })
    store.dispatch({
      type: CLEAR_PLAYGROUP_LIST
    })
    store.dispatch({
      type: CLEAR_BOARD_LIST
    })
    store.dispatch({
      type: SET_CURRENT_BOARD
    })
  }

  onDrawerCollapse(e) {
    store.dispatch(updateDrawerState(false))
  }
}

customElements.define('shell-drawer', ShellDrawer)
