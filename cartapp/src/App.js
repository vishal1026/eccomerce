import React from 'react';
import {ProductsView} from './component/ProductsView'
import './App.css';

class App extends React.Component {

  state = {
    productView : true,
    cartView : false,
    productDetail : false
  }

  render(){
    return (
      <div className="App">
        {
          this.state.productView && <ProductsView/>
        }
      </div>
      );
  }
}

export default App;
