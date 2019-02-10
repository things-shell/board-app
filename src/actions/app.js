export const UPDATE_PAGE = 'UPDATE_PAGE'
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE'
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE'
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const SET_PAGE_AND_ID = 'SET-PAGE-AND-ID'
export const UPDATE_WIDE_LAYOUT = 'UPDATE-WIDE-LAYOUT'

import { SET_CURRENT_GROUP } from './board.js'

import { fetchBoard, fetchBoardList } from '../actions/board'

import { i18next } from '@things-shell/client-i18n'

export const navigate = path => (dispatch, getState) => {
  // Extract the page name from path.
  const page = path === '/' ? 'list-recent' : path.split('/')[1]
  const id = path.split('/')[2]

  dispatch({
    type: SET_PAGE_AND_ID,
    route: { page, id }
  })

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(followRouteChange(page, id))
}

export const setRoute = (page, id) => dispatch => {
  const location = window.location
  const origin = location.origin || location.protocol + '//' + location.host
  const path = id ? `/${page}/${id}` : `/${page}`
  const href = `${origin}${path}`

  if (location.pathname === path) return
  window.history.pushState({}, '', href)

  dispatch(navigate(path))
}

/* Route 변경시, 각 Route별로 필요한 state 설정 작업을 수행한다. */
export const followRouteChange = (page, id) => dispatch => {
  switch (page) {
    case 'list-by-group':
      import('../pages/page-board-list.js')

      dispatch({
        type: SET_CURRENT_GROUP,
        group: id,
        groupType: 'group'
      })

      dispatch(fetchBoardList('group', id))
      break

    case 'list-recent':
      import('../pages/page-board-list.js')
      dispatch({
        type: SET_CURRENT_GROUP,
        groupType: 'recent'
      })

      dispatch(fetchBoardList('recent'))
      break

    case 'list-by-playgroup':
      import('../pages/page-board-list.js')
      dispatch({
        type: SET_CURRENT_GROUP,
        group: id,
        groupType: 'playGroup'
      })

      dispatch(fetchBoardList('playGroup', id))
      break

    case 'modeller':
      dispatch(fetchBoard(id))
      break

    case 'player':
      import('../pages/page-board-player.js')
      dispatch({
        type: SET_CURRENT_GROUP,
        group: id
      })

      if (!id) {
        dispatch(setRoute('player'))
        return
      } else {
        dispatch(fetchBoardList('playGroup', id, 'player'))
      }
      break

    case 'viewer':
      import('../pages/page-board-viewer.js')
      dispatch(fetchBoard(id))
      break

    case 'signup':
      import('@things-shell/client-auth/template/signup.js')
      break

    case 'signin':
      import('@things-shell/client-auth/template/signin.js')
      break

    case 'profile':
      import('@things-shell/client-auth/template/profile.js')
      break

    default:
      import('../pages/page-404.js')
      dispatch(setRoute('page-404'))
      break
  }
}

let snackbarTimer

export const showSnackbar = message => dispatch => {
  dispatch({
    type: OPEN_SNACKBAR,
    message
  })
  window.clearTimeout(snackbarTimer)
  snackbarTimer = window.setTimeout(() => dispatch({ type: CLOSE_SNACKBAR }), 3000)
}

export const updateOffline = offline => (dispatch, getState) => {
  // Show the snackbar only if offline status changes.
  if (offline !== getState().app.offline) {
    dispatch(
      showSnackbar(
        i18next.t('text.you.are.now.in', {
          state: i18next.t(offline ? 'text.offline' : 'text.online')
        })
      )
    )
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  })
}

export const updateLayout = wideLayout => (dispatch, getState) => {
  dispatch({
    type: UPDATE_WIDE_LAYOUT,
    wideLayout
  })
  // Open the drawer when we are switching to wide layout and close it when we are
  // switching to narrow.
  dispatch(updateDrawerState(wideLayout))
}

export const updateDrawerState = opened => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened
  }
}
