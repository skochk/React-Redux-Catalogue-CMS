import React, { Component, useEffect , useState} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { forwardRef } from 'react';
import { withStyles ,makeStyles } from '@material-ui/core/styles';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable , { MTableToolbar } from "material-table";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

import { addCategory , deleteCategory as deleteCategoryAction } from '../../actions/categoryAction';
import Alert from '../Alert';



const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


export default function(){
  const goods = useSelector(state => state.goodsReducer.goods);
  const categories = useSelector(state => state.categoryReducer.categories);
  const subcategories = useSelector(state => state.subcategoryReducer.subcategories);
  const status = useSelector(state => state.goodsReducer.status);
  const statusText = useSelector(state => state.goodsReducer.statusText);
  const dispatch = useDispatch();

  console.log(goods);
  let temData = {
    name: 'gatika',
    displayName: '11',
    description:
      '  Line 10:40:peadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanused-vars',
    shortDescription: 'asdada',
    displayPosition: '1',};
 
    let obj = {"status":status,"statusText":statusText}
    return (
      <div style={{ width: "100%" }}>
        {/* <button onClick={()=>{dispatch(addCategory(temData))}}>quick add</button>*/}
        <Alert props={obj}/>
        <MaterialTable  
          icons={tableIcons} 
          columns={[
            { title: "Name", field: "name"},
            { title: "Main image", field: "mainPhoto",
                render: rowData=> <img src={`/image/${rowData.mainPhoto}`} style={{width: 100, borderRadius: "3px"}}/>
            },
            {title: "price", field: "price"},
            {title: "Pos in category", field: "displayPositionInCategory",cellStyle:{width:"100px"}},
            {title: "Pos in subcategory", field: "displayPositionInSubategory",cellStyle:{width:"100px"}},
            { title: "Display name", field: "displayName" },
            { title: "Short description", field: "shortDescription",
              cellStyle:{  
                maxWidth:"100px",
                wordWrap: 'break-word'
            }},
            { title: "Description", field: "description",
              cellStyle:{ 
                maxWidth:"200px", 
                wordWrap: 'break-word'
            }},
          ]}
          data={goods}
          title="Goods"
          editable={{
            // onRowAdd: function (newData){
            //     return dispatch(addCategory(newData));
            // },
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              }),
          onRowDelete: oldData =>{
            return dispatch(deleteCategoryAction(oldData));
          }
        }}
        components={{
            Toolbar: props => (
            <>
                <MTableToolbar {...props} />
                <Link to="/goods/add" style={{ textDecoration: 'none' }}>
                  <Button variant="contained">add good</Button>
                </Link>
            </>
            )}}
        />
      </div>
    );
}

