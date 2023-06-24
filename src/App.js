import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from './Button';

import { BrowserRouter, Route ,Routes } from 'react-router-dom';
import {ColorModeContext,useMode} from './theme';
import { CssBaseline,ThemeProvider } from '@mui/material';

import Home from './pages/Home';
import About from './pages/About';
import ResponsiveNavBar from './pages/global/Navbar';
import ProductsView from './pages/products/ProductsView';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [theme,colorMode] = useMode();
  const [cartState,setCartState] = useState({
    totalAmount:0,
    totalQuantity:0
  });
  
  return (
    
    <>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ToastContainer position='bottom-center' />
      <BrowserRouter>
         <ResponsiveNavBar cartState={cartState}/>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/cart" element={<ProductsView cartState={cartState} setCartState={setCartState}/>} />          
          <Route path="*" element={<>
          <h1>
            Page Not Found
          </h1>
          </>} />
          
        </Routes>
      </BrowserRouter>
      
      </ThemeProvider>
    </ColorModeContext.Provider>
      {/*<ProductTotal productsTotal={productsTotal}/>
      <ProductsGrid calculateProductsTotal={calculateProductsTotal}/>
      {showCounter && counter.count}
       <Button className="btn btn-primary" text="+1" increment={1} onIncrement={incrementHandler}/>
       <Button className="btn btn-primary" text="+5" increment={5} onIncrement={incrementHandler}/>
       <Button className={counter.count>0?"btn btn-primary":"btn btn-danger"} disabled={counter.count>0?false:true} text="-1" increment={-1} onIncrement={incrementHandler}/>
       <Button className="btn btn-primary" text="Show/Hide Counter" onIncrement={toogleShowCounter}/>
      <div>
      </div>
      <div>
        {`The Result is ${counter.result}`}
        {`The Result is ${showCounter}`}
      
  </div>*/}
    </>
  );
}

export default App;
