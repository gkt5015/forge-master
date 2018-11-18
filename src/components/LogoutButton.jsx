import React from 'react';
import { observer, inject } from 'mobx-react';

const LogoutButton = props => {
    const { controller, store } = props;
    if (!store.user) {
        return null;
    }
    return (
        <button
            className="logout-btn warn-btn"
            onClick={controller.handleLogout}
        >
            Log-Out
        </button>
    );
};

export default inject('store')(observer(LogoutButton));
