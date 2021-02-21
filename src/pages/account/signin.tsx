import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
Amplify.configure(awsconfig);

var email = null, password = null, codice = null;

// Salva in automatico i cookie per ricordare il il login è stato fatto
async function signIn() {
    Auth.signIn(email, password)
        .then(user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') { // Non dovrebbe essere necessario credo se la password non ha scadenza. Da capire meglio
                var newPassword = password + "new";
                const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
                Auth.completeNewPassword(
                    user,               // the Cognito User Object
                    newPassword       // the new password
                )
                    .then(user => {
                        // at this time the user is logged in if no MFA required
                        console.log(user);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                console.log(user);
            }
        })
        .catch(error => {
            console.log('error signing in', error);
            document.getElementById('err-registrazione').innerHTML = "Errore: " + error.message;
        });
}

function inviaCodiceRecupero() {
    Auth.forgotPassword(email)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
function recuperaPassword() {
    Auth.forgotPasswordSubmit(email, codice, password)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

const login = () => (
    <Layout>
        <div>
            <h1>Login</h1>
        email: <input type="text" onChange={e => { email = e.target.value; }} /><br />
        password: <input type="password" onChange={e => { password = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={signIn}>Login</button>

            <h1>Codice per recupero password</h1>
        email: <input type="text" onChange={e => { email = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={inviaCodiceRecupero}>Invia codice recupero</button>

            <h1>Recupera password</h1>
        email: <input type="text" onChange={e => { email = e.target.value; }} /><br />
        codice recupero: <input type="text" onChange={e => { codice = e.target.value; }} /><br />
        new password: <input type="password" onChange={e => { password = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={recuperaPassword}>Recupera password</button>
        </div>
    </Layout>
);

export default login;