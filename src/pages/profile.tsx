import Layout from '../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

// Salva in automatico i cookie per ricordare il il login è stato fatto

var emailUtente = "";
var vecchia, nuova;

Auth.currentAuthenticatedUser()
    .then(user => {
        emailUtente = user.attributes.email;
        console.log(user);
    })
    .catch(err => { emailUtente = err; console.log("Errore1: " + err); });

function cambiaPassword() {
    Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, vecchia, nuova);
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

Auth.currentSession()
    .then(res => {
        let accessToken = res.getAccessToken()
        let jwt = accessToken.getJwtToken()
        console.log(`myJwt: ${jwt}`)
    })
    .catch(err => { emailUtente = err; console.log("Errore2: " + err); });

const render = () => {
    return (
        <Layout>
            <label id="informazioni-utente">Profilo: {emailUtente}</label> <br />

        vecchia password: <input type="password" onChange={e => { vecchia = e.target.value; }} /><br />
        nuova password: <input type="password" onChange={e => { nuova = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={cambiaPassword}>Cambia password</button><br /><br />
        </Layout>

    );
}

export default render;