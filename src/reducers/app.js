import {
  UPDATE_PAGE,
  UPDATE_OFFLINE,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  UPDATE_DRAWER_STATE,
  SET_PAGE_AND_ID,
  UPDATE_WIDE_LAYOUT
} from '../actions/app.js'

const INITIAL_STATE = {
  page: '',
  id: null,
  offline: false,
  drawerOpened: false,
  snackbarOpened: false,
  wideLayout: false
}

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_WIDE_LAYOUT:
      return {
        ...state,
        wideLayout: action.wideLayout
      }
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      }
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      }
    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened
      }
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true
      }
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      }

    case SET_PAGE_AND_ID:
      let route = action.route

      return {
        ...state,
        page: route.page || 'list-by-group',
        id: route.id
      }

    default:
      return state
  }
}

export default app
