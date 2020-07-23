import {
    SUBCATEGORY_SUCC_LOAD,
    SUBCATEGORY_ERROR_LOAD,
    DATA_LOADING,
    SUBCATEGORY_ADD_ELEM,
    SUCC_DELETE,
    SUBCATEGORY_ERROR_ADD,
    SUBCATEGORY_SUCC_EDIT,
} from '../actions/actionTypes';
import update from 'immutability-helper';


const initialState = {
    subcategories: [],
    status: 'error' // loading/success/error
}

export default function(state=initialState, action){
    switch (action.type) {
        case DATA_LOADING: 
            return update(state, {
                // status: { $set: 'loading'}
            })
        case SUBCATEGORY_SUCC_LOAD:
            return update(state, { 
                subcategories: { $set: action.subcategories },
                status: { $set: 'success'},
                statusText: {$set: 'Subcategories successfully loaded!'}
            });
        case SUBCATEGORY_ERROR_LOAD: 
            return update(state, {
                status: { $set: 'error'},
                statusText: {$set: 'Error has occured, try later'}
            })
        case SUBCATEGORY_ERROR_ADD:
            return update(state,{
                status: {$set: "error"},
                statusText: {$set: 'Wrong input data'}
            })
        case SUBCATEGORY_ADD_ELEM:
            let valid = true;
            
            for(let value in state.subcategories){
                if(state.subcategories[value].name === action.newElemSubCategory.name){
                    console.log('invalid')
                    valid = false;
                }
            }
            if(!valid){
                return update(state,{
                    status: { $set: 'error'},
                    statusText: {$set: `"${action.newElemSubCategory.name}" already exist`}
                }); 
            }else{
                return update(state,{
                    subcategories: { $push: [action.newElemSubCategory]},
                    status: { $set: 'success'},
                    statusText: {$set: 'Successfully added!'}
                });
            }
        case SUCC_DELETE:
            // index - index of item which will be deleted from ca  tegory array 
            let index = state.subcategories.indexOf(action.ElemToDeleteSubCategory);
            return update(state,{
                subcategories: {$splice: [[index,1]]},
                status: { $set: 'success'},
                statusText: {$set: 'Successfully deleted!'}
            })

        case SUBCATEGORY_SUCC_EDIT:
            let index1;
            state.subcategories.forEach((elem,index)=>
                action.editedSubcategory._id == elem._id ? index1 = index : null)
            return update(state,{ 
                subcategories:{
                    [index1]:{ $set: action.editedSubcategory}
                }
            })
        default:
            return state;
    }

}   