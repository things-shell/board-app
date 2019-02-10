import { LitElement, html } from 'lit-element'
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'
import { installOfflineWatcher } from 'pwa-helpers/network.js'
import { installRouter } from 'pwa-helpers/router.js'
import { updateMetadata } from 'pwa-helpers/metadata.js'

import '@things-shell/client-auth'
import { i18next, localize } from '@things-shell/client-i18n'

import { store } from '../store.js'

import { navigate, updateOffline, updateLayout, updateDrawerState, showSnackbar } from '../actions/app.js'
import { updateUser, updateAuthenticated } from '../actions/auth.js'

import '@polymer/app-layout/app-drawer/app-drawer.js'

import '../shell/shell-drawer.js'
import '../components/snack-bar.js'
import '../components/board-provider'

import en_US from '../resources/en-US.js'
import ko_KR from '../resources/ko-KR.js'
import zh_CN from '../resources/zh-CN.js'

i18next.addResourceBundle('en-US', 'translations', en_US['en-US'], true, true)
i18next.addResourceBundle('ko-KR', 'translations', ko_KR['ko-KR'], true, true)
i18next.addResourceBundle('zh-CN', 'translations', zh_CN['zh-CN'], true, true)

import { AppTheme } from '../styles/app-theme'
import { style } from './app-shell-style.js'

class MyApp extends connect(store)(localize(i18next)(LitElement)) {
  /* localize를 initialize하는 component는 localize(i18next) mixin을 사용해야 한다. */
  constructor() {
    super()

    this.baseUrl = 'http://localhost:3000'

    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true)
  }

  static get properties() {
    return {
      appTitle: { type: String },
      page: { type: String },
      snackbarOpened: { type: Boolean },
      offline: { type: Boolean },

      // statePath: 'auth.user'
      user: { type: Object },

      // statePath: 'auth
      authenticated: { type: Boolean },
      // statePath: 'auth.error'
      authError: { type: Object },

      /* drawer의 상태를 반영함 */
      drawerOpened: { type: Boolean },
      wideLayout: { type: Boolean },
      forceNarrow: { type: Boolean },

      /* Board Reference Provider */
      provider: { type: Object },
      baseUrl: { type: String },
      meta: { type: String }
    }
  }

  static get styles() {
    return [AppTheme, style]
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <auth-router
        @authenticated-changed=${this.onAuthenticatedChanged}
        @profile-changed=${this.onProfileChanged}
        @error-changed=${this.onAuthErrorChanged}
        endpoint=${this.baseUrl}
      ></auth-router>

      <board-provider baseUrl=${this.baseUrl} @change=${e => (this.provider = e.target.refProvider)}> </board-provider>

      <!-- Drawer content -->
      <app-drawer
        @opened-changed=${this.drawerOpenedChanged}
        .opened=${this.drawerOpened}
        .persistent=${this.wideLayout && !this.forceNarrow}
        ?forceNarrow=${this.forceNarrow}
      >
        <shell-drawer started=${this.authenticated}></shell-drawer>
      </app-drawer>

      <!-- Main content -->
      <main ?forceNarrow=${this.forceNarrow || !this.drawerOpened || !this.authenticated}>
        <page-board-list
          ?active=${['list-recent', 'list-by-group', 'list-by-playgroup'].indexOf(this.page) > -1}
        ></page-board-list>
        <page-board-viewer
          ?active=${this.page === 'viewer'}
          .provider=${this.provider}
          .baseUrl=${this.baseUrl}
        ></page-board-viewer>
        <page-board-player ?active=${this.page === 'player'} .provider=${this.provider}></page-board-player>

        <auth-signin ?active=${this.page === 'signin'}></auth-signin>
        <auth-signup ?active=${this.page === 'signup'}></auth-signup>
        <auth-profile ?active=${this.page === 'profile'}></auth-profile>

        <page-404 ?active=${this.page === 'page-404'}></page-404>
      </main>

      <aside class="meta">${this.meta}</aside>

      <snack-bar ?active=${this.snackbarOpened}>${this.message}</snack-bar>
    `
  }

  firstUpdated() {
    installRouter(location => store.dispatch(navigate(decodeURIComponent(location.pathname))))
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)))
    installMediaQueryWatcher(`(min-width: 768px)`, matches => store.dispatch(updateLayout(matches)))

    i18next.on('initialized', () => {
      store.dispatch({
        type: 'SET-LOCALE',
        locale: i18next.language
      })

      this.onLocaleChanged()
    })
    i18next.on('languageChanged', () => this.onLocaleChanged())
  }

  updated(change) {
    change.has('drawerOpened') && store.dispatch(updateDrawerState(this.drawerOpened))
    change.has('authError') && this.onAuthErrorChanged()

    if (change.has('page')) {
      this.onPageChanged()

      const pageTitle = this.appTitle + ' - ' + this.page
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      })
    }
  }

  onProfileChanged(e) {
    store.dispatch(updateUser(e.detail.profile))
  }

  onAuthenticatedChanged(e) {
    var auth = e.detail
    store.dispatch(updateAuthenticated(auth))
    store.dispatch(showSnackbar(`You are now signed ${auth.authenticated ? 'in' : 'out'}`))
  }

  onAuthErrorChanged() {
    if (this.authError) {
      store.dispatch(showSnackbar(this.authError))
    }
  }

  drawerOpenedChanged(e) {
    this.drawerOpened !== e.target.opened && store.dispatch(updateDrawerState(e.target.opened))
  }

  onPageChanged() {
    switch (this.page) {
      case 'signin':
      case 'signup':
      case 'viewer':
        this.forceNarrow = true
        store.dispatch(updateDrawerState(false))
        break
      default:
        this.forceNarrow = false
        store.dispatch(updateDrawerState(true))
    }
  }

  onLocaleChanged() {
    this.meta = i18next.t('env-mention', {
      version: process.env['APP-VERSION'],
      env: process.env['NODE_ENV']
    })
  }

  stateChanged(state) {
    this.page = state.app.page
    this.offline = state.app.offline
    this.message = state.app.message
    this.snackbarOpened = state.app.snackbarOpened

    this.drawerOpened = state.app.drawerOpened
    this.wideLayout = state.app.wideLayout
    this.authenticated = state.auth.authenticated
  }
}

window.customElements.define('app-shell', MyApp)
