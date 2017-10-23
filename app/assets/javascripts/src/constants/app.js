import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGES: null,
  POST_MESSAGES: null,
  UPLOAD_PICTURE: null,
  GET_USERS: null,
  GET_FRIENDS: null,
  POST_FRIENDS: null,
  DESTROY_FRIENDS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

export const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  // MESSAGES: APIRoot + '/messages',
  // MESSAGES: APIRoot + '/users/:id',
  MESSAGES: APIRoot + '/messages',
  PICTURE_MESSAGES: APIRoot + '/messages/pictures',
  USERS: APIRoot + '/users/search',
  FRIENDS: APIRoot + '/friends',
}
