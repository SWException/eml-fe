import 'styles/globals.css';
import { ClientLayout } from 'components/layouts/client-layout';

function MyApp({ Component, pageProps }) {
  return (
    <ClientLayout>
      <Component {...pageProps} />
    </ClientLayout>
  )
}

export default MyApp;
