import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      // MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      // DBとして保存させない場合
      // MessagesAction.sendMessage(this.state.value)
      // ここからpostのアクションに移行させたい
      MessagesAction.postMessages(this.state.value)
      this.setState({
        value: '',
      })
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
      // value: MessagesStore.getMessages(),
    })
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          // idかkeyを定めたい
          // key ={ message.id}
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
