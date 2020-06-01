import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../../datasource/fetch';
import TextArea from 'antd/lib/input/TextArea';

export function EditProfile() {
    const [profile, setProfile] = useState<any | null>(null);
    const history = useHistory();
    const [saveState, setSaveState] = useState<{
      id: string;
      body: string;
    } | null>(null);

    useEffect(() => {
        (async () => {
        try {
            const data = await fetchData('http://localhost:3000/profile');
            setProfile(data);
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
            const data = await fetchData('http://localhost:3000/profile', {
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
            id: profile!.id,
            body: JSON.stringify(args),
          });        
      }
    
      function onFinishFailed(...args: any) {
        console.log(args);
      }
      return (
        <div>
          <h3>Edit Profile</h3>
          {profile ? (
            <div>
              <FormEdit initialValues={profile} onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
}

interface FormEditProps {
    initialValues: any;
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
      <Form.Item label='Title' name='title'>
        <Input />
      </Form.Item>
  
        <Form.Item label='Role' name='role'>
          <Input />
        </Form.Item>
  
        <Form.Item label='Email' name='email'>
          <Input />
        </Form.Item>
  
        <Form.Item label='Phone' name='phone'>
          <Input />
        </Form.Item>
  
        <Form.Item label='Twitter' name='twitter'>
          <Input />
        </Form.Item>
  
        <Form.Item label='Location' name='location'>
          <Input />
        </Form.Item>
  
        <Form.Item label='BIO' name='bio'>
          <TextArea />
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
  