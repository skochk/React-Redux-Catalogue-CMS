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
import { addCategory , loadCategories as loadCategoriesAction ,
  deleteCategory as deleteCategoryAction , 
  updateSubcategory as updateSubcategoryAction } from '../../actions/subcategoryAction';
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
  
  const subcategoriesData = useSelector(state => state.subcategoryReducer.subcategories);
  const categoriesData = useSelector(state => state.categoryReducer.categories);
  const status = useSelector(state => state.subcategoryReducer.status);
  const statusText = useSelector(state => state.subcategoryReducer.statusText);
  const dispatch = useDispatch();
  
  let categoriesNames = []; // key
  let categoriesIDs = []; // value
  let lookup = {};
  if(categoriesData){
    for(let i = 0; i < categoriesData.length; i++){
        categoriesIDs.push(categoriesData[i]._id);
        categoriesNames.push(categoriesData[i].name);
    }
    categoriesIDs.forEach((key, i) => lookup[key] = categoriesNames[i]);
  }
  let temData = {
    name: 'gatika',
    displayName: '11',
    idCategory: '123213213213213213213213',
    description:'eeeeeeeee weipfwfwefpwefwe ewfipwefpfwepifjwep ewfewjpfwepfjwef wefwefwefwef',
    shortDescription: 'asdada',
    displayPosition: '1',};
    let obj = {"status":status,"statusText":statusText};

    
    return (
      <div style={{ width: "100%" }}>
        {/* dev buttons */}
        {/* <button onClick={()=>{dispatch(addCategory(temData))}}>quick add</button>
        <button onClick={()=>{console.log(subcategoriesData)}}>console log state</button> */}
        <Alert props={obj}/>
        <MaterialTable  
          icons={tableIcons} 
          columns={[
            { title: "Name", field: "name" },
            { title: "Position", field: "displayPosition"},
            { title: "idCategory", field: "idCategory",
            lookup: lookup,
            },
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
          }}
          ]}
          data={subcategoriesData} 
          title="Subcategories"
          editable={{
            onRowAdd: function (newData){
              let test = newData;
              test.old = subcategoriesData;
                return dispatch(addCategory(test));
            },
            onRowUpdate: newData=>{
              return dispatch(updateSubcategoryAction(newData));
            },
            onRowDelete: oldData =>{
              return dispatch(deleteCategoryAction(oldData));
            }
        }}
        />
      </div>
    );
}

