import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  // SEND_MESSAGE: null,
  GET_MESSAGES: null,
  SEND_MESSAGES: null,
  UPLOAD_PICTURE: null,
  GET_USERS: null,
  GET_FRIENDS: null,
  MAKE_FRIENDS: null,
  DESTROY_FRIENDS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

export const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  FRIENDS: APIRoot + '/friends',
}
