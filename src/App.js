import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Switch,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import List from './List';
import Latest from './Latest';
import Category from './Category';
import Item from './Item';
import NewItem from './NewItem';
import EditItem from './EditItem';
import DeleteItem from './DeleteItem';
import NewCategory from './NewCategory';
import DeleteCategory from './DeleteCategory';
import Login from './Login';

class App extends Component {
  
  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Catalog App</h1>
            <Route path="/" component={Login} />
          </header>
          <div className="content">
            <Route path="/catalog" component={List} />
            <Route path="/Latest" component={Latest} />
            <Switch>
              
              <Route exact path="/catalog/new" component={NewCategory} />
              <Route exact path="/catalog/:category" component={Category} />
              <Route exact path="/catalog/:category/delete" component={DeleteCategory} />
              <Route exact path="/catalog/:category/new" component={NewItem} />
              <Route exact path="/catalog/:category/:item/edit" component={EditItem} />
              <Route exact path="/catalog/:category/:item/delete" component={DeleteItem} />
              <Route path="/catalog/:category/:item" component={Item} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export const UserContext = React.createContext({
  email: '',
  name: '',
  picture: '',
});

export default App;
