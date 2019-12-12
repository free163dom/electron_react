import React from 'react';
import './win-head.scss';
import { Icon, Modal, Checkbox } from 'antd';
import 'antd/dist/antd.css';

const { confirm } = Modal;

class winHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      showConfirm: true,
    };
    this.closeHandle = this.closeHandle.bind(this);
    this.fullscreenHandle = this.fullscreenHandle.bind(this);
    this.minimizeHandle = this.minimizeHandle.bind(this);
  }

  // 记录下次是否弹出确认关闭弹窗
  isOpenConfirm(e) {
    console.log(e.target.checked);
  }

  // 关闭程序
  closeHandle() {
    confirm({
      title: '你确定要退出吗？',
      content: <Checkbox onChange={this.isOpenConfirm}>不再显示</Checkbox>,
      cancelText: '返回',
      okText: '退出',
      okType: 'danger',
      centered: true,
      maskClosable: true,
      onOk() {
        // this.setState({
        //   date: new Date()
        // });
        global.app.quit();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 最小化
  minimizeHandle() {
    global.ipcRenderer.send('min');
  }

  // 全屏切换
  fullscreenHandle() {
    global.ipcRenderer.send('fullscreen');
  }

  render() {
    return (
      <div className="winHead">
        <div className="winHead_handle">
          <div className="winHead_handle-btn winHead_handle--close" onClick={this.closeHandle}>
            <Icon type="close" className="winHead_handle-btn_icon" />
          </div>
          <div className="winHead_handle-btn winHead_handle--minus" onClick={this.minimizeHandle}>
            <Icon type="minus" className="winHead_handle-btn_icon" />
          </div>
          <div className="winHead_handle-btn winHead_handle--fullscreen" onClick={this.fullscreenHandle}>
            <Icon type="fullscreen" className="winHead_handle-btn_icon" />
          </div>
        </div>

        <div className="winHead_main">
          { this.props.title }
        </div>
      </div>
    );
  }
};

export default winHead;
