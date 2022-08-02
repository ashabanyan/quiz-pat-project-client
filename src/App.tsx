import React from 'react';
import { BrowserRouter} from 'react-router-dom'
import RouterComponent from './routes/Routes';
import store from './store/index'
import { Provider } from 'mobx-react';

const App: React.FC = () => {
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <RouterComponent />
            </BrowserRouter>
        </Provider>
    )
}

export default App;