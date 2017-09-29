import React from 'react'
// import classNames from 'classNames'
import UsersStore from '../../stores/users'
import _ from 'lodash'

class UsersList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
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

  render() {
    const users_information = _.map(this.state.users, (user) => {
      return (
        <ul key={user.id}>
          <li>
            name : { user.name }
          </li>
          <li>
            email : { user.email }
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
