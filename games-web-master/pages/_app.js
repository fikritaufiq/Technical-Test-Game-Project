import '../styles.css'
import {Layout} from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '../store/_store.js'
import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from "react-redux";
import { persistStore } from 'redux-persist'


function MyApp({Component, pageProps}) {
    let persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            </PersistGate>
        </Provider>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp