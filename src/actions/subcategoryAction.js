import axios from 'axios';

import {
    SUBCATEGORY_SUCC_LOAD,
    SUBCATEGORY_ERROR_LOAD,
    SUBCATEGORY_ADD_ELEM,
    SUCC_DELETE,
    SUBCATEGORY_ERROR_ADD,
    DATA_ERR,
    SUBCATEGORY_SUCC_EDIT,
} from './actionTypes';

export const loadCategories = ()=> {
    return async (dispatch) =>{
        axios.get('/subcategory')
        .then((data)=>{
           return dispatch({
                type: SUBCATEGORY_SUCC_LOAD,
                subcategories: data.data,
            })
        })
        .catch(error=>{
            return dispatch({
                type: SUBCATEGORY_ERROR_LOAD,
            })
        })
    }
};  

function validateCategory(cat){
        if(cat.name.length >= 1 && cat.name.length <=300){
            if(cat.displayPosition.length >= 1 && cat.displayPosition.length <=300){
                if(cat.displayName.length >= 1 && cat.displayPosition.length <=300){
                    if(cat.idCategory.length >= 1 && cat.idCategory.length <= 300){
                        if(cat.shortDescription.length >= 1 && cat.displayPosition.length <=300){
                            if(cat.description.length >= 50 && cat.displayPosition.length <=1000){
                                return true;
                            }   
                        }
                    }
                }
            }
        } 
        else{
            return false;
        }
        
} 

export const addCategory = (category)=>{
    return async (dispatch) =>{
        let valid = validateCategory(category);
        if(!valid){
            return dispatch({
                type: SUBCATEGORY_ERROR_ADD,
            })
        }else{
            axios.put("/subcategory/add",category)
            .then((data)=>{
                console.log(data);
                if(data == 'invalid data'){
                    console.log('eerore')
                    return dispatch({
                        type: SUBCATEGORY_ERROR_LOAD,
                    }); 
                }else{ 
                    return dispatch({
                        type: SUBCATEGORY_ADD_ELEM,
                        newElemSubCategory: data.data,
                    });
                }
            })
            .catch((err)=>{
                return dispatch({
                    type: SUBCATEGORY_ERROR_LOAD, 
                })
            })
        }
    }
}

export const deleteCategory = (category)=>{
    console.log(category);
    return async (dispatch) =>{
        axios.delete(`/subcategory/${category._id}`)
        .then((data)=>{
            if(data.data == category._id){
                return dispatch({
                    type: SUCC_DELETE,
                    ElemToDeleteSubCategory:category,
                })
            }else{
                return dispatch({
                    type:SUBCATEGORY_ERROR_LOAD
                })                
            }
        })
    }
}



export const updateSubcategory = (category)=>{
    return async (dispatch)=>{
        axios.post(`/subcategory/${category._id}`,
        category,
        {headers: {
            'Content-Type': 'application/json'
        }})
        .then((data)=>{
            if(data.status == "error"){
                return dispatch({
                    type: DATA_ERR,
                })
            }else{
                return dispatch({
                    type: SUBCATEGORY_SUCC_EDIT,
                    editedSubcategory: data.data,  
                })
            }
        })
        .catch((err)=>{
            return dispatch({
                type: DATA_ERR, 
            })
        })
    }
}