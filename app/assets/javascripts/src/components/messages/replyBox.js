import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import PictureUpload from '../../components/messages/pictureUpload'

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
      id: MessagesStore.getOpenChatID(),
      value: '',
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

  // updatePicture(e) {
  //   if (e.keyCode === 13) {
  //     MessagesAction.uploadPicture(this.state.picture, this.state.id)
  //     this.setState({
  //       picture: '',
  //     })
  //   }
  // }

  // handlePicture(e) {
  //   // ①イベントからfileの配列を受け取る
  //   MessagesAction.uploadPicture(e.target.files[0], this.state.id)
  // }

  render() {
    return (
      <div className='reply-box'>
        <h6>Type your message</h6>
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
        <PictureUpload />,
      </div>
    )
  }
}

export default ReplyBox

// var React = require('react/addons');
// var UploadFileActionCreator = require('../actions/upload_file_action_creator');

// var FileUploader = React.createClass({
//     getInitialState: function() {
//         return {
//             dragging: false
//         };
//     },
//     uploadFiles: function(files) {
//         var formData = new FormData();

//         for (var i = 0, f; f = files[i]; ++i) {
//             formData.append('file', f);
//             UploadFileActionCreator.upload(formData);
//         }
//     },


//     handleChangeFile: function(e) {
//         var files = e.target.files;

//         this.uploadFiles(files);
//     },
//     render: function() {
//         var className = this.state.dragging ? 'app-file-selection-area-dragging' : 'app-file-selection-area';

//         var element =
//             <div className={className}>
//                 <div className="app-drop-area" >
//                     <input type="file" className="app-upload-file" ref="file" onChange={this.handleChangeFile} />
//                 </div>
//             </div>

//         return (element);
//     }
// });

// module.exports = FileUploader;

        // <input
        //   type="file"
        //   // onClick={this.handlePicture}
        //   onChange={ (e)=>{this.readFile(e)} }
        //   onClick={ (e)=>{e.target.value = null} }
        // />