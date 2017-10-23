import React from 'react'
import FriendsStore from '../../stores/friends'
import FriendsAction from '../../actions/friends'
import MessagesAction from '../../actions/messages'
import _ from 'lodash'

class FriendsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.destroyFriendship = this.destroyFriendship.bind(this)
    this.getMessages = this.getMessages.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      friends: FriendsStore.getFriends(),
    }
  }

  // コンポーネントライフサイクルに関しては次のリンク参照（http://qiita.com/aka_k_root/items/8ac3c33737709fa510cf）
  componentWillMount() {
    FriendsStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    FriendsStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  destroyFriendship(friend) {
    FriendsAction.destroyFriends(friend)
  }

  getMessages(friend) {
    MessagesAction.getMessages(friend)
    MessagesAction.changeOpenChatID(friend.id)
  }

  render() {
    const friends_name = _.map(this.state.friends, (friend) => {
      return (
        <div key={friend.id}>
          <li
          onClick={this.getMessages.bind(this, friend)}>friend name : { friend.name } 
          <button onClick={this.destroyFriendship.bind(this, friend)}>push to delete</button>
          </li>
        </div>
      )
    })
    return (
      <div>
        This is FriendsList.
        { friends_name }
      </div>
    )
  }
}

export default FriendsList
