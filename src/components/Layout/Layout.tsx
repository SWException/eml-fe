import Header from 'components/Header';
import {Fragment} from 'react'

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <Fragment>
            <Header isVisible="true"/>
            {children}
        </Fragment>
    );
}

export default Layout;