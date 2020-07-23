import axios from 'axios';

import {
    GOODS_SUCC_LOAD,
    GOODS_ERROR_LOAD,
    DATA_LOADING,
    GOODS_ADD_ELEM,
    GOODS_DEL_ELEM,
    GOODS_SUCC_ADD,
    GOODS_ERROR_ADD,
} from './actionTypes';

export const loadGoods = ()=> {
    return async (dispatch) =>{
        axios.get('/good')
        .then((data)=>{
           return dispatch({
                type: GOODS_SUCC_LOAD,
                goods: data.data,
            })
        })
        .catch(error=>{
            return dispatch({
                type: GOODS_ERROR_LOAD,
            })
        })
    }
};  


export const addGood = (good)=>{
    console.log(good);
    return async (dispatch , getState) =>{
        axios.post("/good/add",good,
        // {headers: {'Content-Type': 'multipart/form-data' },}
        )
        .then((data)=>{ 
            console.log(data.data);
            if(data == 'invalid data'){
                return dispatch({
                    type: GOODS_ERROR_ADD,
                });
            }else{
                return dispatch({
                    type: GOODS_SUCC_ADD,
                    newGood: data.data,
                });
            }
        })
        .catch((err)=>{
            return dispatch({
                type: GOODS_ERROR_ADD, 
            })
        })
}
}

// export const deleteCategory = (category)=>{
//     return async (dispatch) =>{
//         axios.delete(`/category/${category._id}`)
//         .then((data)=>{
//             if(data.data == category._id){
//                 return dispatch({
//                     type: SUCC_DELETE,
//                     ElemToDeleteCategory:category,
//                 })
//             }else{
//                 return dispatch({
//                     type:DATA_ERR
//                 })                
//             }
//         })
//     }
// }