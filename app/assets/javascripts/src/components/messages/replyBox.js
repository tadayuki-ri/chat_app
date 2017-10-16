import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = this.initialState
  // }

  // get initialState() {
  //   return {
  //     value: '',
  //     id: MessagesStore.getOpenChatID(),
  //   }
  // }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      value: '',
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

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      // MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      // DBとして保存させない場合
      // MessagesAction.sendMessage(this.state.value)
      // ここからpostのアクションに移行させたい
      MessagesAction.postMessages(this.state.value, this.state.id)
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
          placeholder='Type message to reply to ..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
