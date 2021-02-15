import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

var username = null, password = null, codice = null;

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

function inviaCodiceRecupero() {
    Auth.forgotPassword(username)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
function recuperaPassword() {
    Auth.forgotPasswordSubmit(username, codice, password)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

const login = () => (
    <Layout>
        <div>
            <h1>Login</h1>
        email: <input type="text" onChange={e => { username = e.target.value; }} /><br />
        password: <input type="password" onChange={e => { password = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={signIn}>Login</button>

            <h1>Codice per recupero password</h1>
        email: <input type="text" onChange={e => { username = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={inviaCodiceRecupero}>Invia codice recupero</button>

            <h1>Recupera password</h1>
        email: <input type="text" onChange={e => { username = e.target.value; }} /><br />
        codice recupero: <input type="text" onChange={e => { codice = e.target.value; }} /><br />
        new password: <input type="password" onChange={e => { password = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={recuperaPassword}>Recupera password</button>
        </div>
    </Layout>
);

export default login;