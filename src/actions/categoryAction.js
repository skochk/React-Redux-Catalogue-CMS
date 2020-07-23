import axios from 'axios';

import {
    DATA_SUCCESS,
    DATA_ERR,
    PUSH_ELEM_TO_CATEGORY,
    SUCC_DELETE,
    ERR_ADD_CATEGORY,
    CATEGORY_SUCC_EDIT,
} from './actionTypes';

export const loadCategories = ()=> {
    return async (dispatch) =>{
        axios.get('/category')
        .then((data)=>{
           return dispatch({
                type: DATA_SUCCESS,
                categories: data.data,
            })
        })
        .catch(error=>{
            return dispatch({
                type: DATA_ERR,
            })
        })
    }
};  

function validateCategory(cat){
        if(cat.name.length >= 1 && cat.name.length <=300){
            if(cat.displayPosition.length >= 1 && cat.displayPosition.length <=5){
                if(cat.displayName.length >= 1 && cat.displayPosition.length <=300){
                    if(cat.shortDescription.length >= 1 && cat.displayPosition.length <=300){
                        if(cat.description.length >= 50 && cat.displayPosition.length <=1000){
                            return true
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
    return async (dispatch , getState) =>{
        let valid = validateCategory(category);
        if(!valid){
            return dispatch({
                type: ERR_ADD_CATEGORY,
            })
        }else{
            axios.put("/category/add",category)
            .then((data)=>{ 
                if(data == 'invalid data'){
                    return dispatch({
                        type: DATA_ERR,
                    });
                }else{
                    return dispatch({
                        type: PUSH_ELEM_TO_CATEGORY,
                        newElemCategory: data.data,
                    });
                }
            })
            .catch((err)=>{
                return dispatch({
                    type: DATA_ERR, 
                })
            })
        }
    }
}

export const deleteCategory = (category)=>{
    return async (dispatch) =>{
        axios.delete(`/category/${category._id}`)
        .then((data)=>{
            if(data.data == category._id){
                return dispatch({
                    type: SUCC_DELETE,
                    ElemToDeleteCategory:category,
                })
            }else{
                return dispatch({
                    type:DATA_ERR
                })                
            }
        })
    }
}

export const updateCategory = (category)=>{
    return async (dispatch)=>{
        axios.post(`/category/${category._id}`,
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
                    type: CATEGORY_SUCC_EDIT,
                    editedCategory: data.data,  
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