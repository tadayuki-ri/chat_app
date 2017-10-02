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
      // inputに入力を可能にする
      value: e.target.value,
    })
    UsersAction.getUsers(e.target.value)
  }

  render() {
    return (
      <div className='users-box'>
        Hello! Please put user name into the box to search
        <input
          // value={ this.state.value }
          // 一方入力を感知するonChangeは今回使う
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
