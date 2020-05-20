
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import './index.css';
import { update } from '../../utils';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onDoubleClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default class EditableTable extends React.Component {

  render() {
    const { props } = this;

    let { 
          compsId,
          rowSelection,
          columns,
          pagination,
          bordered,
          footer,
          onEditSave,
          dataSource
    } = props;

    console.log('etd',dataSource);
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    columns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      if(col.children){
        const ch = col.children;
        
        col.children = ch.map(e => {
          return {
            ...e,
            onCell: record => ({
              record,
              editable: e.editable,
              dataIndex: e.dataIndex,
              title: e.title,
              handleSave: onEditSave,
            }),
          };
        })
        return {
          ...col
        };
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: onEditSave,
        }),
      };
    });
    return (
      <div>
        <Table
          compsId={compsId}
          rowSelection={rowSelection}
          columns={columns}
          pagination={pagination}
          bordered={bordered}
          scroll={{ y: 'calc(100vh - 320px)' }}
          footer={footer}
          components={components}
          dataSource={dataSource}
          rowClassName={() => 'editable-row'}
        />
      </div>
    );
  }
}