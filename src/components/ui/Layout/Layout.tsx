import {Header} from 'components/ui';
import React, {Fragment} from 'react';

const Layout: React.FC = ({children}) => {
    //decidere quando stampare o no le categories
    return (
        <Fragment>
            <Header isVisible="true"/>
            {children}
        </Fragment>
    );
}

export default Layout;