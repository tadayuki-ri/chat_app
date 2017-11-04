import React from 'react'
// import Header from './header'
import FriendsList from './friendsList'
import MessagesBox from './messagesBox'
import DefaultmessagesBox from './defaultmessagesBox'
import MessagesStore from '../../stores/messages'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      id: MessagesStore.getOpenChatID(),
    }
  }

  // コンポーネントライフサイクルに関しては次のリンク参照（http://qiita.com/aka_k_root/items/8ac3c33737709fa510cf）
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    return (
        <div className='app'>
          <FriendsList/>
          { this.state.id ? <MessagesBox/> : <DefaultmessagesBox/> }
        </div>
      )
  }
}

export default App
