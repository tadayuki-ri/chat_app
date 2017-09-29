import Dispatcher from '../dispatcher'
// import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'
import {ActionTypes, APIEndpoints} from '../constants/app'
import request from 'superagent'

export default {
  getUsers(value) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}`)
      .query({name: value})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_USERS,
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
