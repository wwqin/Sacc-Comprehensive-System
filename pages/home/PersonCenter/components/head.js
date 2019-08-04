import React from 'react';
import '../less/head.less';
import { connect } from 'react-redux';
import { actionCreators, store} from '../../store';
import { Upload, Icon, message } from 'antd';
import axios from 'axios'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Head extends React.Component{

  constructor(props){
    super(props)
    this.portraitRef = React.createRef()
    this.state ={
      loading:false,
      flag: false,
      num: 0
    }
  }

  getyu = url =>{
    axios.get("http://192.168.1.8:8080/admin/test",{
      url
    })
    .then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    console.log(url)
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
     
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
    //this.getyu(this.state.imageUrl)
  };


  changeSignatureInput = () => {
    this.setState({
      flag: !flag
    })
  }
  changeSignature = (e) => {
    this.props.BasicInformationList[9].value = e.target.value;

    this.setState({
      num:1
    })
    
    this.props.changeBasicInformation(List)
  }


    render(){
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const { imageUrl } = this.state;
    return (
      <div className="PChead">
        <div className="PCgreenSlide"></div>
        <div className="personHeadLeft">
          <div className="PCimgBox">
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                action="http://192.168.1.8:8080/admin/test"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '70px', height: '70px' }} /> : uploadButton}
            </Upload>
          </div>
          <div className="PCDes">
            <p>{this.props.BasicInformationList[0].value}</p>
            <span>{this.props.BasicInformationList[4].value}</span>
            <span 
            onClick={this.changeSignatureInput}
            >
            {this.state.flag ?
            <input value={this.props.BasicInformationList[9].value} onChange={this.changeSignature}/>
            :this.props.BasicInformationList[9].value}
            </span>
          </div>
        </div>
        <div className="personHeadRight">
          <button>打卡</button>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) =>{
	return {
    BasicInformationList: state.home.BasicInformationList
	}
};
const mapDispatchToProps = (dispatch) => {
	return {

	}
};
export default connect(mapStateToProps,mapDispatchToProps)(Head)