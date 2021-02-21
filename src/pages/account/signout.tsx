import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);

// Elimina i cookie e fa il logout
async function signOut() {
    try {
        await Auth.signOut();
        console.log("Logout");
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

const logout = () => (
    <Layout>
        <div>
            <h1>Logout</h1>
            <button onClick={signOut}>Logout</button>
            <button onClick={signOutGlobal}>Logout da tutti i device</button>
        </div>
    </Layout>
);

export default logout;