import * as React from 'react';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Reducer from '_redux/store.js';

import Navigations from '_navigations/index.js';
import Theme from '_styles/themeComponent/index.js';

const store = createStore(Reducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Theme>
                    <Navigations></Navigations>
                </Theme>
            </Provider>
        );
    }
}

export default App;
