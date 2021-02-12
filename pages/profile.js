import Layout from '../components/Layout';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

// Salva in automatico i cookie per ricordare il il login è stato fatto

var emailUtente = "";

Auth.currentAuthenticatedUser()
    .then(user => {
        emailUtente = user.attributes.email;
        console.log(user);
    })
    .catch(err => { emailUtente = err; console.log(err); });

const render = () => {
    return (
        <Layout>
            <label id="informazioni-utente">Profilo: {emailUtente}</label>
        </Layout>
    );
}

export default render;