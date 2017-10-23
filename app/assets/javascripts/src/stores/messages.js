import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/user'
import {ActionTypes} from '../constants/app'
// import _ from 'lodash'

// const messages = {
//   2: {
//     user: {
//       profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
//       id: 2,
//       name: 'Ryan Clark',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424469794050,
//       currentUser: 1424469794080,
//     },
//     messages: [
//       {
//         contents: 'Hey!',
//         from: 2,
//         timestamp: 1424469793023,
//       },
//       {
//         contents: 'Hey, what\'s up?',
//         from: 1,
//         timestamp: 1424469794000,
//       },
//     ],
//   },
//   3: {
//     user: {
//       read: true,
//       profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
//       name: 'Jilles Soeters',
//       id: 3,
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424352522000,
//       currentUser: 1424352522080,
//     },
//     messages: [
//       {
//         contents: 'Want a game of ping pong?',
//         from: 3,
//         timestamp: 1424352522000,
//       },
//     ],
//   },
//   4: {
//     user: {
//       name: 'Todd Motto',
//       id: 4,
//       profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424423579000,
//       currentUser: 1424423574000,
//     },
//     messages: [
//       {
//         contents: 'Please follow me on twitter I\'ll pay you',
//         timestamp: 1424423579000,
//         from: 4,
//       },
//     ],
//   },
// }

// var openChatID = parseInt(Object.keys(messages)[0], 10)

class ChatStore extends BaseStore {
  // 最終的にはmessageは使わないので、getOpenChatUserID、getChatByUserID、getAllChatsは使わないはず
  // addChangeListener(callback) {
  //   this.on('change', callback)
  // }
  // removeChangeListener(callback) {
  //   this.off('change', callback)
  // }
  // getOpenChatUserID() {
  //   return openChatID
  // }
  // getChatByUserID(id) {
  //   return messages[id]
  // }
  // getAllChats() {
  //   return messages
  // }

  getMessages() {
    if (!this.get('messages')) this.setMessages([])
    return this.get('messages')
  }

  setMessages(array) {
    this.set('messages', array)
  }

  getOpenChatID() {
    if (!this.get('openChatID')) this.setOpenChatID()
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
    // case ActionTypes.UPDATE_OPEN_CHAT_ID:
    //   openChatID = action.userID
    //   messages[openChatID].lastAccess.currentUser = +new Date()
    //   MessagesStore.emitChange()
    //   break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      // openChatID = action.userID
      MessagesStore.setOpenChatID(action.userID)
      MessagesStore.emitChange()
      break

  //   case ActionTypes.SEND_MESSAGE:
  //     // const userID = action.userID
  //     messages[userID].messages.push({
  //       contents: action.message,
  //       timestamp: action.timestamp,
  //       // from: UserStore.user.id,
  //     })
  //     // messages[userID].lastAccess.currentUser = +new Date()
  //     MessagesStore.emitChange()
  //     break

  // getStateFromStore() {
  //   // const allMessages = MessagesStore.getAllChats()
  //   // 試しにこれで書いてみる
  //   const allMessages = MessagesStore.getMessages()

  //   const messageList = []
  //   _.each(allMessages, (message) => {
  //     const messagesLength = message.messages.length
  //     messageList.push({
  //       lastMessage: message.messages[messagesLength - 1],
  //       lastAccess: message.lastAccess,
  //       user: message.user,
  //     })
  //   })
  //   return {
  //     openChatID: MessagesStore.getOpenChatUserID(),
  //     messageList: messageList,
  //   }
  // }

    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.POST_MESSAGES:
      // const messages = MessagesStore.getMessages()
      // messages.push(action.json)
      // MessagesStore.setMessages(messages)
      // MessagesStore.emitChange()
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
