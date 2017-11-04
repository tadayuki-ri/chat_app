import React from 'react'
import MessagesAction from '../../actions/messages'
import MessagesStore from '../../stores/messages'

class PictureUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.handlePicture = this.handlePicture.bind(this)
    this.submitPicture = this.submitPicture.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {
      id: MessagesStore.getOpenChatID(),
      picture: '',
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

  handlePicture(e) {
    this.setState({
      picture: e.target.files[0],
    })
  }

  submitPicture(e) {
    MessagesAction.uploadPicture(this.state.picture, this.state.id)
    this.setState({
      picture: '',
    })
  }

  render() {
    return (
      <div className='picture-upload'>
        <input type="file" onChange={this.handlePicture} />
        <button type="submit" onClick={this.submitPicture}>Upload Picture</button>
      </div>
    )
  }
}

export default PictureUpload
