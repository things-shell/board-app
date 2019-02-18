import { LitElement } from 'lit-element'

import { ReferenceMap, create, error } from '@hatiolab/things-scene'

import client from './board-api'

class BoardProvider extends LitElement {
  constructor() {
    super()
    import('@things-scene/form')
    import('@things-scene/billboard')
    import('@things-scene/chartjs')
    import('@things-scene/clock')
    import('@things-scene/clone')
    import('@things-scene/compass')
    import('@things-scene/echart')
    import('@things-scene/elasticsearch')
    import('@things-scene/firebase')
    import('@things-scene/forklift')
    import('@things-scene/form')
    import('@things-scene/gauge')
    import('@things-scene/google-map')
    import('@things-scene/half-roundrect')
    import('@things-scene/indoor-map')
    import('@things-scene/legend')
    import('@things-scene/marker')
    import('@things-scene/mpi')
    import('@things-scene/person')
    import('@things-scene/progressbar')
    import('@things-scene/random')
    import('@things-scene/restful')
    import('@things-scene/slam')
    import('@things-scene/tab')
    import('@things-scene/table')
    import('@things-scene/traffic')
    import('@things-scene/stomp')
    import('@things-scene/mqtt')
    import('@things-scene/wheel-sorter')
  }

  static get properties() {
    return {
      refProvider: Object,
      baseUrl: String
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

            scene.app.baseUrl = this.baseUrl
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
