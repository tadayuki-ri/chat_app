import React from 'react'
import FriendsStore from '../../stores/friends'
import FriendsAction from '../../actions/friends'
import _ from 'lodash'

class FriendsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
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

  getFriends() {
    FriendsAction.getFriends()
  }

  render() {
    const friends_name = _.map(this.state.friends, (friend) => {
      return (
        <div key={friend.id}>
          to_user_id : { friend.to_user_id }
        </div>
      )
    })
    return (
      <div
        onClick={ this.getFriends.bind(this) }
      >
        This is FriendsList.
        { friends_name }
      </div>
    )
  }
}

export default FriendsList
