import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Sidebar from './Components/Sidebar'; 
import ShowCategory from './Components/ShowCategory';
import ShowSubcategory from './Components/ShowSubcategory';
import AddGood from './Components/AddGood';
import Goods from './Components/Goods';
import { HashRouter as BrowserRouter, Switch, Route, Link , browserHistory} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { makeStyles , withStyles } from '@material-ui/core/styles';

export const history = createBrowserHistory()

function App() {

  const drawerWidth = 130;
  const useStyles = makeStyles(theme => ({
    workArea:{
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
  }}));
  const classes = useStyles();

  return (
    <Provider store={store}>
    <BrowserRouter history={history}>
      <Sidebar/>
      <div className={classes.workArea}>
        <Route exact path='/categories'><ShowCategory/></Route>
        <Route exact path='/subcategories'><ShowSubcategory/></Route>
        <Route exact path='/goods'><Goods/></Route>
        <Route exact path='/goods/add'><AddGood/></Route>
      </div>
      
    </BrowserRouter>
    </Provider>
  );
}

export default App;
