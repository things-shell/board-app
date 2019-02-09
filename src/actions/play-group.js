export const PLAYGROUP_LIST = 'PLAYGROUP-LIST'
export const CLEAR_PLAYGROUP_LIST = 'CLEAR-PLAYGROUP-LIST'

import client from '../components/board-api'

import { setRoute } from './app'
import { BOARD_LIST, fetchBoardList } from './board'

export const fetchPlayGroupList = () => async dispatch => {
  try {
    const data = await client.fetchPlayGroupList()

    dispatch({
      type: PLAYGROUP_LIST,
      list: data.playGroups
    })
  } catch (error) {
    dispatch({
      type: CLEAR_PLAYGROUP_LIST
    })
  }
}

export const createPlayGroup = group => async dispatch => {
  try {
    const data = await client.createPlayGroup(group)

    dispatch(fetchPlayGroupList())
    dispatch(fetchBoardList('playGroup', data.createPlayGroup.id))
  } catch (error) {
    console.error(error)
  }
}

export const updatePlayGroup = group => async dispatch => {
  try {
    const data = await client.updatePlayGroup(group)

    dispatch(fetchPlayGroupList())
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}

export const deletePlayGroup = group => async dispatch => {
  try {
    var { id } = group

    const data = await client.deletePlayGroup(id)

    dispatch(fetchPlayGroupList())
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}

export const joinPlayGroup = (boardId, group) => async dispatch => {
  try {
    var { id } = group

    const data = await client.joinPlayGroup(boardId, id)

    dispatch(setRoute('list-by-playgroup', id))

    dispatch({
      type: BOARD_LIST,
      group: id,
      list: data.joinPlayGroup.boards
    })
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}

export const leavePlayGroup = (boardId, group) => async dispatch => {
  try {
    var { id } = group

    const data = await client.leavePlayGroup(boardId, id)

    dispatch(setRoute('list-by-playgroup', id))

    dispatch({
      type: BOARD_LIST,
      group: id,
      list: data.leavePlayGroup.boards
    })
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}
