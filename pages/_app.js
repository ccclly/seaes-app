import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';

export default function App ({ Component, pageProps }) {
  return (<>
    <TopBar/>
    <Component {...pageProps} />
    <Navbar/>
  </>);
}
