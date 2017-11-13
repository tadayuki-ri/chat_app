import React from 'react'
import FriendsStore from '../../stores/friends'
import FriendsAction from '../../actions/friends'
import MessagesAction from '../../actions/messages'
import MessagesStore from '../../stores/messages'
import classNames from 'classNames'
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
      id: MessagesStore.getOpenChatID(),
      friends: FriendsStore.getFriends(),
    }
  }

  // コンポーネントライフサイクルに関しては次のリンク参照（http://qiita.com/aka_k_root/items/8ac3c33737709fa510cf）
  componentWillMount() {
    FriendsStore.onChange(this.onStoreChange.bind(this))
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    FriendsStore.offChange(this.onStoreChange.bind(this))
    MessagesStore.offChange(this.onStoreChange.bind(this))
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
      const friendClasses = classNames({
        'friend-list__item__contents': true,
        'friend-list__item__OpenChatID': friend.id === this.state.id,
      })

      return (
        <li key={friend.id} className= 'friend-list__item'>
          <div className= { friendClasses }
            onClick={this.getMessages.bind(this, friend)}> { friend.name } <button onClick={this.destroyFriendship.bind(this, friend)}>Delete</button>
          </div>
        </li>
      )
    })
    return (
      <div className='friend-list'>
        <ul className='friend-list__list'>
          Your Friends
          { friends_name }
        </ul>
      </div>
    )
  }
}

export default FriendsList
