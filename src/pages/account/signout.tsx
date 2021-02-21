import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { Button } from 'reactstrap';
Amplify.configure(awsconfig);

// Elimina i cookie e fa il logout

const Logout = () => {

    //Fare show dei messaggi o degli errori

    async function signOut() {
        try {
            await Auth.signOut();
            console.log("Logout");
            window.localStorage.removeItem('jwt');
            window.localStorage.clear();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    
    async function signOutGlobal() {
        try {
            await Auth.signOut({ global: true });
            console.log("Logout global");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return(
    <Layout>
        <div className="div-card">
            <div className="loginCard" style={{textAlign: "center"}}>
                <h1>Logout</h1>
                <div className="div-button-login" style={{marginTop: "20px"}}>
                <Button color="primary" onClick={signOut}>Logout</Button>
                <Button color="primary" onClick={signOutGlobal}>Logout da tutti i device</Button>
                </div>                
            </div>
        </div>
    </Layout>
    );

};

export default Logout;