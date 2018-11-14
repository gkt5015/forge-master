import React from 'react';
import { observer, inject } from 'mobx-react';

const LogoutButton = props => {
    const { store } = props;
    if (!store.user) {
        return null;
    }
    return <button onClick={store.toggleLogout}>Log-Out</button>;
};

export default inject('store')(observer(LogoutButton));
