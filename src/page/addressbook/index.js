import React, { Component } from 'react';

import { Row, Col, Button } from 'antd';

import Message from 'message/index';
import EditableTable from 'edittable/index';

//api
import {get, put, remove} from 'api/index';

//module
import Person from 'person/person';

//service url
import { person } from 'service/index';

const tableCompsId = 'addreesBookId';

export default class AddressBook extends Component {

  state = {
    selectedRowKeys: [], //Check here to configure the default column
    dataSource: [],
    deleting: true,
    updateing: true,
    creating: true,
  };

  onSelectChange = selectedRowKeys => {
    console.log(selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  genColumns = (locale_maps) => {
    const constant = locale_maps;
    return [
        {
          title: constant.id,
          dataIndex: 'id',
          sorter: (a, b) => a.id > b.id
        },
        {
          title: constant.name,
          dataIndex: 'name',
          sorter: (a, b) => a.name > b.name
        },
        {
          title:  constant.location,
          dataIndex: 'location',
          sorter: (a, b) => a.location > b.location
        },
        {
          title: constant.offcie,
          dataIndex: 'offcie',
          sorter: (a, b) => a.offcie > b.offcie
        },
        {
          title: constant.phone,
          editable: true,
          children: [
            {
              title: constant.offcieNumber,
              dataIndex: 'offcieNumber',
              sorter: (a, b) => a.offcieNumber > b.offcieNumber
            },
            {
              title: constant.cellNumber,
              dataIndex: 'cellNumber',
              sorter: (a, b) => a.cellNumber > b.cellNumber,
              editable: true
            }
          ]
          }       
      ];
  };

  create = () => {

    const { dataSource } = this.state;
    const data = new Person({});
    dataSource.push({...data});
    this.setState({
      dataSource : [...dataSource]
    });

  }

  update = () => {
    
    const { selectedRowKeys, dataSource, updateing } = this.state;
    const { locale_maps } = this.props;
    const { updateSuccessInfo, updateFailInfo, noSelectdInfo } = locale_maps;

    if(!selectedRowKeys.length){
      Message.warning(noSelectdInfo);
      return;
    }

    this.setState({
      updateing: true,
    })
    
    const url = person.update_url;
    const data = dataSource.filter(e => selectedRowKeys.findIndex(key => key === e.key) > -1);
    
    const success = (rep) => {
      data.forEach(e => e.id = e.key);
      
      this.setState({
        dataSource : [...dataSource],
        updateing: false,
      });


      Message.success(updateSuccessInfo);
    };
    const fail = (error) => {
      Message.error(updateFailInfo);
    };

    put({url, data, success, fail})
  }

  remove = () => {
    const { selectedRowKeys, dataSource } = this.state;
    const { locale_maps } = this.props;
    const { deleteSuccessInfo, deleteFailInfo, noSelectdInfo } = locale_maps;

    if(!selectedRowKeys.length){
      Message.warning(noSelectdInfo);
      return;
    }

    this.setState({
      deleting: true
    })
    
    const url = person.delete_url;
    const data = selectedRowKeys;
    
    const success = (rep) => {
      const newData = dataSource.filter(e => {
        const k = e.key;
        const index = data.findIndex(key => key === k);
        return index === -1;
      })
      
      this.setState({
        dataSource : [...newData],
        deleting: false,
        selectedRowKeys: []
      });


      Message.success(deleteSuccessInfo);
    };
    const fail = (error) => {
      Message.error(deleteFailInfo);
    };

    remove({url, data, success, fail})
  }

  retrieve = () => {
    const { locale_maps } = this.props;
    const { retrieveSuccessInfo, retrieveFailInfo } = locale_maps;

    const url = person.retrieve_url;
    const data = null;
    
    const success = (rep) => {
      const dataSource = rep.data.data;
      
      this.setState({
        dataSource : [...dataSource],
        deleting: false,
        updateing: false,
        creating: false
      });


      Message.success(retrieveSuccessInfo);
    };
    const fail = (error) => {
      Message.error(retrieveFailInfo);
    };

    get({url, data, success, fail})
  }

  onEditSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  }

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.retrieve();
  }

  render() {
    const { selectedRowKeys, dataSource, deleting, updateing, creating } = this.state;
    const { locale_maps } = this.props;

    const columns = this.genColumns(locale_maps);
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
        <div className="wrapper">
            <EditableTable 
                compsId={tableCompsId}
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={dataSource}
                pagination={false}
                onEditSave={this.onEditSave}
                bordered
                footer={() => (
                    <Row className="table-tools">
                        <Col span={12}>
                            <Button danger onClick={this.remove} disabled={deleting}>
                                {locale_maps.delete}
                            </Button>
                        </Col>
                        <Col className="button-right" span={12}> 
                            <Button onClick={this.update} disabled={updateing}>
                                {locale_maps.update}
                            </Button>
                            <Button onClick={this.create} disabled={creating}>
                                {locale_maps.create}
                            </Button>
                        </Col>
                    </Row>
                )} />
        </div>
    );
  }
}
