import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'
import '@material/mwc-button/mwc-button'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../store'
import { updateDrawerState } from '../actions/app.js'
import { i18next, localize } from '@things-shell/client-i18n'

class PageToolbar extends connect(store)(localize(i18next)(LitElement)) {
  static get is() {
    return 'page-toolbar'
  }

  constructor() {
    super()

    this.email = ''
    this.drawerOpened = false
  }

  static get properties() {
    return {
      // statePath: 'app.locale'
      locale: Object,
      // statePath: 'app.drawerOpened'
      drawerOpened: Boolean,
      // statePath: 'app.auth.user.email
      email: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: row;

          background-color: var(--primary-dark-color);
          justify-content: space-between;
          height: 45px;
          padding: 0;
          color: var(--third-color);
        }

        mwc-button {
          font-size: 14px;
          margin: 0px;
          padding: 0px;
          vertical-align: middle;
        }

        slot {
          flex: 1;

          display: flex;
          flex-direction: row;

          flex-basis: 1280px;
          flex-wrap: nowrap;
          height: 100%;
          align-items: center;
          overflow: hidden;
        }

        [menu] {
          width: 45px;
          height: 45px;
        }

        [user] {
          border-radius: 50%;
          background-color: var(--secondary-color);
          padding: 2px;
          margin: 2px;

          font-size: 1em;
        }

        #user-box {
          flex-basis: 270px;
          justify-content: flex-end;
          align-items: center;
          display: flex;
        }

        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-content {
          position: absolute;
          background-color: #f1f1f1;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          tabindex: 1;
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .dropdown-content a:hover,
        .dropdown-content a[selected] {
          background-color: #ddd;
        }

        [hidden] {
          display: none;
        }
      `
    ]
  }

  render() {
    return html`
      <mwc-icon @click="${this.onDrawerOpen}" ?hidden=${this.drawerOpened} menu>menu</mwc-icon>

      <slot></slot>

      <div id="user-box">
        <a href="/profile">
          <mwc-icon title="user" user>person</mwc-icon>
        </a>

        <div class="dropdown">
          <mwc-button .label=${this.email} @click=${e => this.onMenuToggle(true)}></mwc-button>
          <div
            id="menu"
            class="dropdown-content"
            hidden
            @focusout=${e => {
              console.log('focusout')
              this.onMenuToggle(false)
            }}
            @blur=${e => {
              console.log('blur')
              this.onMenuToggle(false)
            }}
            @click=${e => this.onChangeLocale(e)}
          >
            ${[['en-US', 'English'], ['ko-KR', '한글'], ['zh-CN', '中文']].map(
              locale => html`
                <a href="" locale=${locale[0]} ?selected=${locale[0] == this.locale}>${locale[1]}</a>
              `
            )}
          </div>
        </div>
      </div>
    `
  }

  stateChanged(state) {
    this.locale = state.auth.locale
    this.drawerOpened = state.app.drawerOpened
    this.email = state.auth.user && state.auth.user.email
  }

  onDrawerOpen(e) {
    store.dispatch(updateDrawerState(true))
  }

  onMenuToggle(show) {
    var menu = this.shadowRoot.querySelector('#menu')
    menu.hidden = !show

    if (show) {
      // var locale = this.shadowRoot.querySelector('#menu a[selected]')
      menu.focus()
    }
  }

  onChangeLocale(e) {
    var locale = e.target.getAttribute('locale')

    i18next.changeLanguage(locale)

    store.dispatch({
      type: 'SET-LOCALE',
      locale
    })

    e.preventDefault()
    this.onMenuToggle(false)

    return true
  }
}

customElements.define(PageToolbar.is, PageToolbar)
