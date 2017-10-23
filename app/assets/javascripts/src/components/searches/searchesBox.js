import React from 'react'
import UsersAction from '../../actions/users'

class SearchesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
    UsersAction.getUsers(e.target.value)
  }

  render() {
    return (
      <div className='users-box'>
        Hello! Please put user name into the box to search
        <input
          onChange={ this.updateValue.bind(this) }
          value={ this.state.value }
          className='users-box__input'
          placeholder='Type User Name'
        />
      </div>
    )
  }
}

export default SearchesBox
