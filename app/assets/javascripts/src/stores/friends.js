import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class FriendStore extends BaseStore {

  getFriends() {
    if (!this.get('friendship')) this.setFriends([])
    return this.get('friendship')
  }

  setFriends(array) {
    this.set('friendship', array)
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

    case ActionTypes.POST_FRIENDS:
      FriendsStore.setFriends(action.json)
      FriendsStore.emitChange()
      break

    case ActionTypes.DESTROY_FRIENDS:
      FriendsStore.setFriends(action.json)
      FriendsStore.emitChange()
      break
  }
  return true
})

export default FriendsStore
