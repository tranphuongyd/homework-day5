import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { EditProfile } from './edit-profile';

export function Profile(props: any) {
    const {profile} = props;
    const history = useHistory();

    function editProfile() {
        history.push('/edit-profile');
    }

    return (
        <div>
            <Button type="primary" onClick={editProfile}>Edit Profile
            </Button>
            <p>{profile.name}</p>
            <p>{profile.title}</p>
            <p>{profile.role}</p>
            <p>{profile.phone}</p>
            <p>{profile.email}</p>
            <p>{profile.location}</p>
            <p>{profile.bio}</p>
        </div>
    )
}