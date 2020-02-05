import * as React from 'react';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from '_redux/store.js';

import InitFirebase from "_/database/firebase/init.js"
InitFirebase();

import Navigations from '_navigations/index.js';
import Theme from '_styles/themeComponent/index.js';

import { AlertProvider } from '_components/middleware/Alert.js';


const store = createStore(Reducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Theme>
                    <AlertProvider>
                        <Navigations></Navigations>
                    </AlertProvider>
                </Theme>
            </Provider>
        );
    }
}

export default App;
