import React from 'react'
import UsersStore from '../../stores/users'
import FriendsAction from '../../actions/friends'
import _ from 'lodash'

class UsersList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.makeFriendship = this.makeFriendship.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      users: UsersStore.getUsers(),
    }
  }

  // コンポーネントライフサイクルに関しては次のリンク参照（http://qiita.com/aka_k_root/items/8ac3c33737709fa510cf）
  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  makeFriendship(user) {
    FriendsAction.makeFriends(user)
  }

  render() {
    const users_information = _.map(this.state.users, (user) => {
      return (
        <ul className='users-list__list'>
          <li className='users-list__item'
          key={ user.id }
          onClick={ this.makeFriendship.bind(this, user) }
          >
            <a href='/' className='users-list__content'>{ user.name }</a>
          </li>
        </ul>
      )
    })
    return (
      <div className='users-list'>
        { users_information }
      </div>
    )
  }
}

export default UsersList

