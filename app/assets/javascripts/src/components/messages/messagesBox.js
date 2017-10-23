import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'

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
      id: MessagesStore.getOpenChatID(),
      messages: MessagesStore.getMessages(),
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
    const all_messages = _.map(this.state.messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-friend': message.from_user_id === this.state.id,
        'clear': true,
      })
      const message_picture = <img src={"/pictures/"+`${message.picture}`}/ >

      return (
        <li key={ message.id } className={ messageClasses }>
          <div className='message-box__item__contents'>
            {　message.content ? message.content : message_picture }
          </div>
        </li>
      )
    })

    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          This is your friend id: { this.state.id }
          { all_messages }
        </ul>
        <ReplyBox />,
      </div>
      )
  }
}

export default MessagesBox