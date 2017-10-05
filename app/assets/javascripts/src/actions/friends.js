import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
import request from 'superagent'

export default {
  getFriends() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.FRIENDS}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  postFriends(friend) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.FRIENDS}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({friend: friend}) // current_userから引数friendへFriendshipが作られる
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.POST_FRIENDS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  destroyFriends(friend) {
    return new Promise((resolve, reject) => {
      request
      .delete(`${APIEndpoints.FRIENDS}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({friend: friend})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.DESTROY_FRIENDS,
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

