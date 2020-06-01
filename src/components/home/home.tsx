import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { Profile } from '../user-profile/user-profile';
import { fetchData } from '../../datasource/fetch';
import 'antd/dist/antd.css';
import './home.css';
import { Analysis } from '../analysis/analysis';
import { RequestList } from '../requests/requestList';

interface Profile {
    id: string;
    name: string;
    title: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    bio?: string;
}

export function Home() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const history = useHistory();

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


    function addNewRequest() {
      history.push('/requests/add');
    }

    return (
        <div>
            <div className="center">
                <div className="analysis">
                  <Analysis />
                </div>
                <div className="request">
                  <Button type="primary" onClick={addNewRequest}>Add New</Button>
                  <RequestList />
                </div>
            </div>
            <div className="right">
              <h3>Profile</h3>
              {
                  profile ? <Profile profile={profile} /> : null
              }
            </div>
            <div className="clear"></div>
        </div>
    )
}