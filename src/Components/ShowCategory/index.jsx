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
import MaterialTable from "material-table";
import { addCategory , deleteCategory as deleteCategoryAction ,
  updateCategory as updateCategoryAction } from '../../actions/categoryAction';
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

  const data = useSelector(state => state.categoryReducer.categories);
  const status = useSelector(state => state.categoryReducer.status);
  const statusText = useSelector(state => state.categoryReducer.statusText);
  const dispatch = useDispatch();
  
  let temData = {
    name: 'gatika',
    displayName: '11',
    description:
      'asdasdasdasdadasdasdasdasdasdasdpeadaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanused-vars',
    shortDescription: 'asdada',
    displayPosition: '1',};
  let obj = {"status":status,"statusText":statusText}
  return (
    <div style={{ width: "100%" }}>
      {/* dev buttons */}
      {/* <button onClick={()=>{dispatch(addCategory(temData))}}>quick add</button> */}
      <Alert props={obj}/>

      <MaterialTable  
        icons={tableIcons} 
        columns={[
          { title: "Name", field: "name" },
          { title: "Display name", field: "displayName" },
          { title: "Description", field: "description",
          cellStyle:{
            maxWidth:"200px",
            wordWrap: 'break-word'
        }},
        { title: "Short description", field: "shortDescription",
          cellStyle:{
            maxWidth:"100px",
            wordWrap: 'break-word'
        }},
        { title: "Position", field: "displayPosition"},
        ]}
        data={data}
        title="Categories"
        editable={{
          onRowAdd: function (newData){
            return dispatch(addCategory(newData));
          },
          onRowUpdate: newData=>{
            return dispatch(updateCategoryAction(newData));
          },
          onRowDelete: oldData =>{
            return dispatch(deleteCategoryAction(oldData));
          }
      }}
      />
    </div>
  );
}

