import React from 'react';
import { Provider } from 'react-redux';
import generateStore from './redux/store';

import Entrypoint from './containers/Entrypoint';

import 'react-toastify/dist/ReactToastify.css';
import 'react-slideshow-image/dist/styles.css';


function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <Entrypoint />
    </Provider>
  );
}

export default App;
