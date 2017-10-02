import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class FriendStore extends BaseStore {

  getFriends() {
    if (!this.get('friends')) this.setFriends([])
    return this.get('friends')
  }

  setFriends(array) {
    this.set('friends', array)
  }
}

const FriendsStore = new FriendStore()

FriendsStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_FRIENDS:
      FriendsStore.setFriends(action.json)
      FriendsStore.emitChange()
      break
  }
  return true
})

export default FriendsStore
