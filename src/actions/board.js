export const NEW_BOARD = 'NEW-BOARD'
export const BOARD_LIST = 'BOARD-LIST'
export const CLEAR_BOARD_LIST = 'CLEAR-BOARD-LIST'
export const SET_CURRENT_BOARD = 'SET-CURRENT-BOARD'
export const SET_CURRENT_GROUP = 'SET-CURRENT-GROUP'

import client from '../components/board-api'
import { setRoute } from './app'

// import ThingsSnackbar from '../../components/things-snackbar'

export const fetchBoardList = (by, id, route) => async dispatch => {
  try {
    const data = await client.fetchBoardList(by, id)

    if (route) {
      dispatch(setRoute(route, id))
    } else {
      switch (by) {
        case 'group':
          dispatch(setRoute('list-by-group', id))
          break
        case 'playGroup':
          dispatch(setRoute('list-by-playgroup', id))
          break
        default:
          dispatch(setRoute('list-recent'))
      }
    }

    dispatch({
      type: BOARD_LIST,
      group: id,
      list: id !== undefined ? data[by].boards : data.boards,
      groupType: by
    })
  } catch (error) {
    dispatch({
      type: CLEAR_BOARD_LIST
    })
  }
}

export const fetchBoard = id => async dispatch => {
  try {
    if (!id) {
      // 생성하는 경우.
      dispatch({
        type: NEW_BOARD
      })
    } else {
      const data = await client.fetchBoard(id)

      const fetchedBoard = data.board

      dispatch({
        type: SET_CURRENT_BOARD,
        board: {
          ...fetchedBoard,
          model: JSON.parse(fetchedBoard.model)
        }
      })
    }
  } catch (error) {
    /* TODO error */
  }
}

export const createBoard = board => async dispatch => {
  try {
    /*
    input NewBoard {
      name        : String!
      description : String
      model       : String!
      width       : Int
      height      : Int
      published   : Boolean
    }
    */

    const data = await client.createBoard(board)

    const createdBoard = data.createBoard

    dispatch({
      type: SET_CURRENT_BOARD,
      board: {
        ...createdBoard,
        model: JSON.parse(createdBoard.model)
      }
    })

    return dispatch
  } catch (error) {
    console.error(error)
    /* TODO error */
    return dispatch
  }
}

export const updateBoard = board => async dispatch => {
  try {
    const data = await client.updateBoard(board)

    const updatedBoard = data.updateBoard

    updatedBoard.model = dispatch({
      type: SET_CURRENT_BOARD,
      board: {
        ...updatedBoard,
        model: JSON.parse(updatedBoard.model)
      }
    })

    // ThingsSnackbar.toast('Saved.')

    return dispatch
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}

export const deleteBoard = board => async dispatch => {
  try {
    var { id } = board

    const data = await client.deleteBoard(id)

    return dispatch
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}
