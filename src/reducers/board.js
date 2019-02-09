import { NEW_BOARD, SET_CURRENT_BOARD, SET_CURRENT_GROUP, BOARD_LIST } from '../actions/board.js'
import { GROUP_LIST, CLEAR_GROUP_LIST } from '../actions/group.js'
import { PLAYGROUP_LIST, CLEAR_PLAYGROUP_LIST } from '../actions/play-group.js'

import { deepClone } from '@things-shell/client-utils'

const BOARD_TEMPLATE = {
  name: '',
  description: '',
  width: 1920,
  height: 1080,
  version: 2,
  model: {
    width: 1920,
    height: 1080
  }
}

const STATE = {
  board: deepClone(BOARD_TEMPLATE),
  group: {},
  groups: [],
  playGroups: [],
  boards: []
}

export default function(state = STATE, action) {
  switch (action.type) {
    case NEW_BOARD:
      return {
        ...state,
        board: deepClone(BOARD_TEMPLATE)
      }

    case SET_CURRENT_BOARD:
      return {
        ...state,
        board: action.board
          ? {
              ...action.board
            }
          : deepClone(BOARD_TEMPLATE)
      }

    case BOARD_LIST:
      return {
        ...state,
        boards: action.list
      }

    case SET_CURRENT_GROUP:
      return {
        ...state,
        group: {
          id: action.group,
          type: action.groupType
        }
      }

    case GROUP_LIST:
      return {
        ...state,
        groups: action.list
      }

    case CLEAR_GROUP_LIST:
      return {
        ...state,
        groups: []
      }

    case PLAYGROUP_LIST:
      return {
        ...state,
        playGroups: action.list
      }

    case CLEAR_PLAYGROUP_LIST:
      return {
        ...state,
        playGroups: []
      }

    default:
      return state
  }
}
