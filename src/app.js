import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AddressBook from 'page/addressbook/index';
import { ConfigProvider, Select, Row, Col} from 'antd';
const { Option } = Select;

import { en_us, zh_cn } from './i18n/index';
const locales = {
    'en-us': en_us,
    'zh-cn': zh_cn
}

import './app.css';

class App extends Component {
  state = {
    locale: 'en-us'
  };

  onLocaleChange = value => {
    this.setState({ locale:  value});
  }

  render() {
    const { locale } = this.state;
    const locale_maps = locales[locale];


    return (
        <ConfigProvider locale={locale_maps.antd}>
            <div className="layout">
                <div className="header"> 
                    <Row>
                        <Col span={12}>{locale_maps.title}</Col>
                        <Col className="locale" span={12}>
                            <Select defaultValue="en-us" style={{ width: 120, color: 'white' }} bordered={false} onChange={this.onLocaleChange}>
                                <Option value="en-us">English</Option>
                                <Option value="zh-cn">中文</Option>
                            </Select>
                        </Col>
                    </Row>
                </div> 
                <div className="content">
                    <AddressBook locale_maps={locale_maps} />
                </div> 
                <div className="footer"> 
                    @Seenyea 2020
                </div>
            </div>
      </ConfigProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
