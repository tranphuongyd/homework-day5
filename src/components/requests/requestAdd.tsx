import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import { fetchData } from '../../datasource/fetch';

export function AddRequest() {
    const history = useHistory();
    const [saveState, setSaveState] = useState<{
      body: string;
    } | null>(null);

    useEffect(() => {
        (async () => {
          if (!saveState) {
            return;
          }
          try {
            const data = await fetchData('http://localhost:3000/requests', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: saveState.body,
            }).then(() => {
                history.push('/');
            });
          } catch (e) {
            console.log(e);
          }
        })();
      }, [saveState]);

      function onFinish(args: any) {    
        setSaveState({
            body: JSON.stringify(args),
          });       
      }
    
      function onFinishFailed(...args: any) {
      }

      return (
        <div>
          <h3>Add New Request Item</h3>
            <FormAdd onFinish={onFinish} onFinishFailed={onFinishFailed} />
        </div>
      );
}
  
function FormAdd(props: any) {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 8 },
    };
    return (
        <Form {...layout} name='basic' onFinish={props.onFinish} onFinishFailed={props.onFinishFailed}>
        <Form.Item label='Subject' name='subject'>
            <TextArea />
        </Form.Item>

        <Form.Item label='Request Date' name='requestedDate'>
            <Input />
        </Form.Item>

        <Form.Item label='Last Date' name='latestDate'>
            <Input />
        </Form.Item>

        <Form.Item label='Status' name='status'>
            <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
}
  