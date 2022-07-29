import React from 'react';
import { BrowserRouter} from 'react-router-dom'
import RouterComponent from './routes/Routes';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <RouterComponent />
        </BrowserRouter>
    )
}

export default App;