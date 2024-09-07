import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Form from './components/Form';
import Data from './components/Data';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path='/details' element={<Data/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
