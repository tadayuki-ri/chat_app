import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import PictureUpload from '../../components/messages/pictureUpload'

class ReplyBox extends React.Component {

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
      value: '',
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
      MessagesAction.sendMessage(this.state.value, this.state.id)
      this.setState({
        value: '',
      })
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type your message here'
        />
          <span className='reply-box__tip'>
            Press <span className='reply-box__tip__button'>Enter</span> to send
          </span>
        <PictureUpload />
      </div>
    )
  }
}

export default ReplyBox
