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
      messages: MessagesStore.getMessages(),
    }
  }

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

  // getRootPage() {
  //   UsersAction.getRootPage()
  // }

  // getMessages() {
  //   MessagesAction.getMessages()
  // }

  render() {
    // const messagesLength = this.state.messages.length
    // const currentUserID = UserStore.user.id

    // const messages = this.state.messages.map((message, index) => {
    //   // const messageClasses = classNames({
    //   //   'message-box__item': true,
    //   //   'message-box__item--from-current': message.from === currentUserID,
    //   //   'clear': true,
    //   // })

    //   return (
    //       <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
    //         <div className='message-box__item__contents'>
    //           { message.contents }
    //         </div>
    //       </li>
    //     )
    // })

    // const lastMessage = this.state>.messages[messagesLength - 1]

    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    // const AA= _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num, key) { return num * 3; });
    // var characters = [{ 'name': 'barney', 'age': 36 },{ 'name': 'fred',   'age': 40 }];
    // const BB=_.map(characters, 'name');

    // const contents = _.map(this.state.messages, "content");

    // const contents = _.map(this.state.messages, "content").map((content) => {
    //   return (
    //       <div>
    //         <li>
    //          { content }
    //         </li>
    //       </div>
    //     )
    // })

    const messages_contents = _.map(this.state.messages, (message) => {
      return (
        <li key={message.id}>
          { message.content }
        </li>
      )
    })

    // const hoge = _.map(this.state.messages, "content").map((message, index) => {
    //   return (
    //       <li>
    //         <div>
    //           { message }
    //         </div>
    //       </li>
    //     )
    // })
    // console.log(hoge)

    // この辺りは試作なので完全削除してしまって良い
    // const messages = this.state.messages
    // const messages = this.messages
    // const messages = JSON.parse([{"id":1,"content":"hello!","created_at":"2017-09-19T01:36:38.298Z","updated_at":"2017-09-19T01:36:38.298Z"},{"id":2,"content":"how are you?","created_at":"2017-09-20T02:20:54.765Z","updated_at":"2017-09-20T02:20:54.765Z"},{"id":3,"content":"I'm fine, thank you!","created_at":"2017-09-20T02:21:17.814Z","updated_at":"2017-09-20T02:21:17.814Z"}])
    // console.log(messages)
    // console.log(AA)
    // console.log(BB)
    // .map((message, index) => {
    //   return (
    //       <div>
    //         { message.content }
    //       </div>
    //     )
    // })

    return (
      <li
        // onClick={ this.getMessages.bind(this) }
      >
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages_contents }
          </ul>
          <ReplyBox />,
        </div>
      </li>
      )
  }
}

export default MessagesBox
