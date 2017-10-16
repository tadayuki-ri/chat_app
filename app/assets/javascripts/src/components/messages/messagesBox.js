import React from 'react'
// import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
// import UserStore from '../../stores/user'
// import Utils from '../../utils'
import _ from 'lodash'
// import MessagesAction from '../../actions/messages'
// import FriendsAction from '../../actions/friends'
// import UsersAction from '../../actions/users'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      // id: MessagesStore.getOpenChatUserID(),
      id: MessagesStore.getOpenChatID(),
      messages: MessagesStore.getMessages(),
    }
  }

  // getOpenChatUserID() {
  //   return MessagesStore.openChatID
  // }

  // getStateFromStore() {
  //   return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
  // }

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
    const messages_contents = _.map(this.state.messages, (message) => {
      return (
        <li key={message.id}>
          { message.content }
        </li>
      )
    })


    return (
      <li
        // onClick={ this.getMessages.bind(this) }
      >
        <div className='message-box'>
          <ul className='message-box__list'>
            This is your friend id: { this.state.id }
            { messages_contents }
          </ul>
          <ReplyBox />,
        </div>
      </li>
      )
  }
}

export default MessagesBox
