import Layout from '../../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

var email = null, password = null, code = null;

// Non fa in automatico anche il login, perché comunque bisogna verificare l'email
async function signUp() {
    try {
        console.log(email);
        const { user } = await Auth.signUp({
            username: email,
            password
        });
        console.log("Registrazione effettuata");
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
        document.getElementById('err-registrazione').innerHTML = "Errore: " + error.message;
    }
}

async function confirmSignUp() {
    try {
        await Auth.confirmSignUp(email, code);
        console.log("Codice confermato");
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(email);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}

const registrazione = () => (
    <Layout>
        <div>
            <h1>Registrazione</h1>
        email: <input type="text" onChange={e => { email = e.target.value; }} /><br />
        password: <input type="password" onChange={e => { password = e.target.value; }} /><br />
            <label id="err-registrazione"></label><br />
            <button onClick={signUp}>Registrati</button><br /><br />
        email: <input type="text" onChange={e => { email = e.target.value; }} /><br />
        codice: <input type="text" onChange={e => { code = e.target.value; }} /><br />
            <button onClick={confirmSignUp}>Conferma codice</button><br />
        email: <input type="text" onChange={e => { email = e.target.value; }} /><br />
            <button onClick={resendConfirmationCode}>Rinvia codice</button><br />
        </div>
    </Layout>
);

export default registrazione;