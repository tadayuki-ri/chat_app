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
    // let file = e.target.files[0]
    // let reader  = new FileReader()
    // reader.onload = function(e) {
    //   console.log(event.target.result)
    //   this.setState({
    //     picture: file,
    // //     imagePreviewUrl: reader.result
    //   })
    // //   that.displayData(e.target.result);
    // }
    // // // readAsText()以外のメソッドは以下参照：http://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
    // reader.readAsDataURL(file)
    // // 初期の仕様
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
      <div>
        <h6>Upload Picture from here</h6>
        <input type="file" onChange={this.handlePicture} />
        <button type="submit" onClick={this.submitPicture}>Upload Picture</button>
      </div>
    )
  }
}

export default PictureUpload

        // <form action="/uploadPicture" method="POST" encType="multipart">
        //   <h6>Upload Picture from here</h6>
        //   <input name="picture" type="file" onChange={this.handlePicture} />
        //   <button type="submit" onClick={this.submitPicture}>Upload Picture</button>
        // </form>


// 参考：http://www.hartzis.me/react-image-upload/


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     file: '',
//     };
//     this.handleImageChange = this.handleImageChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     // TODO: do something with -> this.state.file
//   }

//   handleImageChange(e) {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//       });
//     }

//     reader.readAsDataURL(file)
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input type="file" onChange={this.handleImageChange} />
//           <button type="submit" onClick={this.handleSubmit}>Upload Image</button>
//         </form>
//       </div>
//     )
//   }
// }

// export default PictureUpload