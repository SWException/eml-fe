import Header from 'components/Header';
import React, {Fragment} from 'react';

const Layout: React.FC<Props> = ({ children }) => {
    //decidere quando stampare o no le categories
    return (
        <Fragment>
            <Header isVisible="true"/>
            {children}
        </Fragment>
    );
}

export default Layout;