import React from 'react';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap/dist/react-bootstrap.min.js"
import AllRoutes from './routes/AllRoutes'


import store from './store'

function App() {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
}

export default App;
