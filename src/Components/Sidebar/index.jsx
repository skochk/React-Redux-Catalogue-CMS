import React , { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { makeStyles , withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { loadCategories as loadCategoriesAction } from '../../actions/categoryAction';
import { loadCategories as loadSubCategoriesAction } from '../../actions/subcategoryAction';
import { loadGoods } from '../../actions/goodsAction';

const drawerWidth = 130;

const useStyles =  makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  workArea:{
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const NestedList = withStyles({
    root:{
        paddingLeft: "40px"
    }
})(ListItem);

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [slider, openSlider] = useState(false);

  function handleSlider(){
      openSlider(!slider);
  };

  const dispatch = useDispatch();
  useEffect(()=>{ 
    dispatch(loadCategoriesAction());
    dispatch(loadSubCategoriesAction());
    dispatch(loadGoods());
  },[]);  


  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} anchor="left">
        
        <div className={classes.toolbar} />
        <Divider />

        <List> 
        <Link to="/categories" style={{ textDecoration: 'none', color:"black"  }}>
            <ListItem button key={'Categories'}>
              <ListItemText primary={'Categories'} />
            </ListItem>
        </Link>
  
        <Link to="/subcategories" style={{ textDecoration: 'none', color:"black"  }}>
            <ListItem button key={'Subcategories'}>
              <ListItemText primary={'Subcategories'} />
            </ListItem>
        </Link>
        <Link to="/goods" style={{ textDecoration: 'none', color:"black"  }}>
            <ListItem button key={'Goods'}>
              <ListItemText primary={'Goods'} />
            </ListItem>
        </Link>


        </List> 
        
        {/* <Divider /> */}
        
      </Drawer>
    </div>
  );
}
