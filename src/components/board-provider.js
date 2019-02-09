import { LitElement } from 'lit-element'

import { ReferenceMap, create, error } from '@hatiolab/things-scene'

import client from './board-api'

class BoardProvider extends LitElement {
  static get properties() {
    return {
      refProvider: Object
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.refProvider = new ReferenceMap(
      async (boardId, resolve, reject) => {
        try {
          const data = await client.fetchBoard(boardId)

          var board = data.board
          var model = JSON.parse(board.model)

          var scene

          try {
            scene = await this.refProvider.get(boardId)
            console.warn('Board fetched more than twice.', boardId)
          } catch (e) {
            scene = create({
              model,
              mode: 0,
              refProvider: this.refProvider
            })

            // s.app.baseUrl = undefined;
          }

          resolve(scene, {
            ...board,
            model
          })
        } catch (e) {
          error(e)
          reject(e)
        }
      },
      async (id, ref) => {
        ref.dispose()
      }
    )

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }
}

customElements.define('board-provider', BoardProvider)
