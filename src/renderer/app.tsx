import * as React from 'react';
import './config/ReactotronConfig';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import Application from './components/Application';
import { persistor, store } from './store';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Component />
                        <ToastContainer autoClose={2000} />
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </AppContainer>,
        mainElement
    );
};

render(Application);
