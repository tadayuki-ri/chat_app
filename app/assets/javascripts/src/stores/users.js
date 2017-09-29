import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UserStore extends BaseStore {

  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }

  setUsers(array) {
    this.set('users', array)
  }

}

const UsersStore = new UserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_USERS:
      UsersStore.setUsers()
      UsersStore.setUsers(action.json)
      UsersStore.emitChange()
      break
  }
  return true
})

export default UsersStore
