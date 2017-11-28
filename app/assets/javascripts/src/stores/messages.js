import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {

  getMessages() {
    if (!this.get('messages')) this.setMessages([])
    return this.get('messages')
  }

  setMessages(array) {
    this.set('messages', array)
  }

  getOpenChatID() {
    if (!this.get('openChatID')) this.setOpenChatID(0)
    return this.get('openChatID')
  }
  setOpenChatID(id) {
    this.set('openChatID', id)
  }

}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      MessagesStore.setOpenChatID(action.userID)
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_MESSAGE:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.UPLOAD_PICTURE:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
