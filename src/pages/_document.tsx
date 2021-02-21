import Document, { Html, Head, Main, NextScript } from 'next/document';
/*
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
*/
class MyDocument extends Document {

  render() {
    return (
      <Html lang="it">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <link rel="stylesheet" href="/static/css/styles.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;