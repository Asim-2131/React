 
import './App.css';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './component/MenuComponent';
import {DISHES} from './shared/dishes.js';

function App() {

  const dishes = DISHES;
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href = "/">
            Ristorante Con Fusion
          </NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes = {dishes}/>
    </div>
  );

}

export default App;
