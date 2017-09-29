import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
import request from 'superagent'

export default {
  // changeOpenChat(newUserID) {
  //   Dispatcher.handleViewAction({
  //     type: ActionTypes.UPDATE_OPEN_CHAT_ID,
  //     userID: newUserID,
  //   })
  // },
  // sendMessage(userID, message) {

  // sendMessage(message) {
  //   Dispatcher.handleViewAction({
  //     type: ActionTypes.SEND_MESSAGE,
  //     // userID: userID,
  //     message: message,
  //     timestamp: +new Date(),
  //   })
  // },

  getMessages() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.MESSAGES}`)
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコード
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  postMessages(message) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({message: message}) // これによりサーバ側に送りたいデータを送ることが出来ます。
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.POST_MESSAGES,
            // message,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

}

