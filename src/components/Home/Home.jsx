import React from 'react';
import { Outlet } from 'react-router-dom';

class Home extends React.Component {   

    render () {
        return ( <Outlet /> )
    }
}

export default Home;