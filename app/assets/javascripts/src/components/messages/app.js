import React from 'react'
// import Header from './header'
import FriendsList from './friendsList'
import MessagesBox from './messagesBox'

class App extends React.Component {
  render() {
    return (
        <div className='app'>
          <FriendsList/>
          <MessagesBox />
        </div>
      )
  }
}

export default App
