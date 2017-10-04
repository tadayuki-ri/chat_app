import React from 'react'
// import classNames from 'classNames'
import UsersStore from '../../stores/users'
// import UsersAction from '../../actions/users'
import FriendsAction from '../../actions/friends'
import _ from 'lodash'

class UsersList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    // Cannot read property 'bind' of undefinedエラーへの対処
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
    FriendsAction.postFriends(user)
  }

  render() {
    const users_information = _.map(this.state.users, (user) => {
      return (
        <ul>
          <li 
          key={ user.id }
          onClick={ this.makeFriendship.bind(this, user) }
          >
            <a href="/">name : { user.name }</a>
          </li>
        </ul>
      )
    })
    return (
      <div>
        UsersList
        { users_information }
      </div>
    )
  }
}

export default UsersList

       // // <ul>
       //  <div>
       //    <li key={user.id}>name : { user.name }</li>
       // //    <li key={user.id}>email : { user.email }</li>
       //    <li key={user.id}>
       //      <a href="/">Dashboard</a>
       //    </li>
       //    // <li><a href="/">Dashboard</a></li>
       //    // <li
       //    // onClick={this.makeFriendShip.bind(this, user)}
       //    // ><a href="/">name:{ user.name }</a>
       //    // </li>
       //  // </ul>
       //  </div>
