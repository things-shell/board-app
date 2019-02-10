import { LitElement, html, css } from 'lit-element'
import { i18next, localize } from '@things-shell/client-i18n'

import '@material/mwc-icon/mwc-icon'

class SearchInput extends localize(i18next)(LitElement) {
  static get properties() {
    return {
      value: String
    }
  }

  static get styles() {
    // TODO define variables for customization
    return [
      css`
        #clear {
          width: 24px;
          height: 24px;
          padding: 0;
        }

        [hidden] {
          display: none;
        }
      `
    ]
  }

  render() {
    return html`
      <mwc-icon>search</mwc-icon>
      <input
        @keyup=${e => {
          this.value = e.target.value
          this.shadowRoot.querySelector('#clear').hidden = !(this.value && this.value.length > 0)
        }}
        .value=${this.value}
        placeholder=${i18next.t('keyword')}
      />
      <mwc-icon
        id="clear"
        @click=${e => {
          this.value = ''
          e.target.hidden = true
        }}
        hidden
      >clear</mwc-icon
    `
  }
}

customElements.define('search-input', SearchInput)
