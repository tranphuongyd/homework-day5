import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../../datasource/fetch';
import { RequestModel } from '../../models/request-item';
import TextArea from 'antd/lib/input/TextArea';

interface RouteParams {
    id: string
}

export function EditRequest() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [requestItem, setRequestData] = useState<RequestModel | null>(null);
    const [saveState, setSaveState] = useState<{
      id: string;
      body: string;
    } | null>(null);

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchData('http://localhost:3000/requests/' + params.id);
            setRequestData(data);
        } catch (e) {
            console.log(e);
        }
        })();
    }, []);

    useEffect(() => {
        (async () => {
          if (!saveState) {
            return;
          }
          try {
            const data = await fetchData('http://localhost:3000/requests/' + params.id, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: saveState.body,
            }).then((response) => {
                history.push('/');
            });
          } catch (e) {
            console.log(e);
          }
        })();
      }, [saveState]);

    function onFinish(args: any) {    
        setSaveState({
            id: requestItem!.id,
            body: JSON.stringify(args),
          });       
      }
    
      function onFinishFailed(...args: any) {
      }
      return (
        <div>
          <h3>Edit Request Item</h3>
          {requestItem ? (
            <div>
              <FormEdit initialValues={requestItem} onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
}

interface FormEditProps {
    initialValues: RequestModel;
    onFinish: (formValue: any) => void;
    onFinishFailed: (error: any) => void;
  }
  function FormEdit(props: FormEditProps) {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 8 },
    };
    return (
      <Form {...layout} name='basic' initialValues={props.initialValues} onFinish={props.onFinish} onFinishFailed={props.onFinishFailed}>
        <Form.Item label='Subject' name='subject'>
          <TextArea />
        </Form.Item>
  
        <Form.Item label='Status' name='status'>
          <Input />
        </Form.Item>
  
        <Form.Item label='Request Date' name='requestedDate'>
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
  