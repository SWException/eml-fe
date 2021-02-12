import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

var username = null, password = null;

// Salva in automatico i cookie per ricordare il il login è stato fatto
async function signIn() {
    try {
        const user = await Auth.signIn(username, password);
        console.log(user);
    } catch (error) {
        console.log('error signing in', error);
        document.getElementById('err-registrazione').innerHTML = "Errore: " + error.message;
    }
}

const login = () => (
    <Layout>
        <div>
            <h1>Login</h1>
        email: <input type="text" onChange={e => { username = e.target.value; }} /><br />
        password: <input type="password" onChange={e => { password = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={signIn}>Login</button>
        </div>
    </Layout>
);

export default login;