import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
import request from 'superagent'

export default {
  changeOpenChatID(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },

  getMessages(friend) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.MESSAGES}/${friend.id}`)
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

  postMessages(message, id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}/${id}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({message: message}) // これによりサーバ側に送りたいデータを送ることが出来ます。
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.POST_MESSAGES,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  // 画像のアップロード：参考https://visionmedia.github.io/superagent/#multipart-requests
  uploadPicture(picture, id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.PICTURE_MESSAGES}/${id}`)
      .set('X-CSRF-Token', CSRFToken())
      // sendではなくattachを用いる
      .attach('picture', picture)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.UPLOAD_PICTURE,
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

