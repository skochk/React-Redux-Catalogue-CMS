import {
    DATA_SUCCESS,
    DATA_ERR,
    DATA_LOADING,
    PUSH_ELEM_TO_CATEGORY,
    SUCC_DELETE,
    ERR_ADD_CATEGORY,
    CATEGORY_SUCC_EDIT,
} from '../actions/actionTypes';
import update from 'immutability-helper';
import { act } from 'react-dom/test-utils';


const initialState = {
    categories: [],
    status: 'error' // loading/success/error
}

export default function(state=initialState, action){
    switch (action.type) {
        case DATA_LOADING: 
            return update(state, {
                // status: { $set: 'loading'}
            })
        case DATA_SUCCESS:
            return update(state, { 
                categories: { $set: action.categories },
                status: { $set: 'success'},
                statusText: {$set: 'Categories successfully loaded'}
            });
        case DATA_ERR: 
            return update(state, {
                status: { $set: 'error'},
                statusText: {$set: 'Error has occured, try later'}
            })
        case ERR_ADD_CATEGORY:
            return update(state,{
                status: {$set: "error"},
                statusText: {$set: 'Wrong input data'}
            })
        case PUSH_ELEM_TO_CATEGORY:
            
            let valid = true;
            for(let value in state.categories){
                if(state.categories[value].name === action.newElemCategory.name){
                    console.log('invalid')
                    valid = false;
                }
            }
            
            if(!valid){
                return update(state,{
                    status: { $set: 'error'},
                    statusText: {$set: `"${action.newElemCategory.name}" already exist`}
                }); 
            }else{
                return update(state,{
                    categories: { $push: [action.newElemCategory]},
                    status: { $set: 'success'},
                    statusText: {$set: 'Successfully added!'}
                });
            }
        case SUCC_DELETE:
            // index - index of item which will be deleted from ca  tegory array 
            let index = state.categories.indexOf(action.ElemToDeleteCategory);
            return update(state,{
                categories: {$splice: [[index,1]]},
                status: { $set: 'success'},
                statusText: {$set: 'Successfully deleted!'}
            });
        case CATEGORY_SUCC_EDIT:
            let index1;
            state.categories.forEach((elem,index)=>
                action.editedCategory._id == elem._id ? index1 = index : null)
            return update(state,{ 
                categories:{
                    [index1]:{ $set: action.editedCategory}
                }
            })
        default:
            return state;
    }

} 