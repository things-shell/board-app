import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon/mwc-icon'

class SearchInput extends LitElement {
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
