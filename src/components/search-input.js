import { LitElement, html, css } from 'lit-element'

import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-input/paper-input'

class SearchInput extends LitElement {
  static get properties() {
    return {
      value: String,
      label: String
    }
  }

  static get styles() {
    // TODO define variables for customization
    return [
      css`
        paper-input {
          font-size: 0.5em;

          --paper-input-container-color: lightgray;
          --paper-input-container-focus-color: lightgray;
          --paper-input-container-input-color: white;
        }

        #clear-button {
          width: 24px;
          height: 24px;
          padding: 0;
        }
      `
    ]
  }

  render() {
    return html`
      <paper-input
        label=${this.label}
        @keyup=${e => {
          this.value = e.target.value
          e.target.querySelector('#clear-button').set('hidden', !(this.value && this.value.length > 0))
        }}
        value=${this.value || ''}
        no-label-float
      >
        <iron-icon icon="icons:search" slot="prefix"></iron-icon>
        <paper-icon-button
          id="clear-button"
          icon="clear"
          slot="suffix"
          @click=${e => {
            this.value = ''
            e.target.set('hidden', true)
          }}
          hidden
        >
        </paper-icon-button>
      </paper-input>
    `
  }
}

customElements.define('search-input', SearchInput)
