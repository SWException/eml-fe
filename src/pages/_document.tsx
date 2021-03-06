import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render (): JSX.Element {
        return (
            <Html lang="it">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://js.stripe.com/v3/"></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;