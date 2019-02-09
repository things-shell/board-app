export const GROUP_LIST = 'GROUP-LIST'
export const CLEAR_GROUP_LIST = 'CLEAR-GROUP-LIST'

import client from '../components/board-api'

import { setRoute } from './app'
import { BOARD_LIST, fetchBoardList } from './board'

export const updateGroup = group => async dispatch => {
  try {
    const data = await client.updateGroup(group)

    dispatch(fetchGroupList())
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}

export const deleteGroup = group => async dispatch => {
  try {
    var { id } = group

    const data = await client.deleteGroup(id)

    dispatch(fetchGroupList())
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}
export const fetchGroupList = () => async dispatch => {
  try {
    const data = await client.fetchGroupList()

    dispatch({
      type: GROUP_LIST,
      list: data.groups
    })
  } catch (error) {
    dispatch({
      type: CLEAR_GROUP_LIST
    })
  }
}

export const createGroup = group => async dispatch => {
  try {
    const data = await client.createGroup(group)

    dispatch(fetchGroupList())
    dispatch(fetchBoardList('group', data.createGroup.id))
  } catch (error) {
    console.error(error)
  }
}

export const joinGroup = (boardId, group) => async dispatch => {
  try {
    var { id } = group

    const data = await client.joinGroup(boardId, id)

    dispatch(setRoute('list-by-group', id))

    dispatch({
      type: BOARD_LIST,
      group: id,
      list: data.joinGroup.boards
    })
  } catch (error) {
    console.error(error)
    /* TODO error */
  }
}
