import {
    GOODS_SUCC_LOAD,
    GOODS_ERROR_LOAD,
    DATA_LOADING,
    GOODS_ADD_ELEM,
    GOODS_DEL_ELEM,
    GOODS_ERROR_ADD,
    GOODS_SUCC_ADD,
} from '../actions/actionTypes';
import update from 'immutability-helper';


const initialState = {
    goods: [], 
    status: 'error', // loading/success/error
    uploadGoodStatus:'error'
}

export default function(state=initialState, action){
    switch (action.type) {
        case DATA_LOADING: 
            return update(state, {
                // status: { $set: 'loading'}
            })
        case GOODS_SUCC_LOAD:
            return update(state, { 
                goods: { $set: action.goods },
                status: { $set: 'success'},
                statusText: {$set: 'Goods successfully loaded!'}
            });
        case GOODS_ERROR_LOAD: 
            return update(state, {
                status: { $set: 'error'},
                statusText: {$set: 'Error has occured, try later'}
            })

        case GOODS_SUCC_ADD:
            return update(state,{
                goods:{$push:action.newGood},
                uploadGoodStatus:{$set: "success"}
            })
        case GOODS_ADD_ELEM:
            let valid = true;
            
            for(let value in state.goods){
                if(state.goods[value].name === action.newElemSubCategory.name){
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
                    goods: { $push: [action.newElemSubCategory]},
                    status: { $set: 'success'},
                    statusText: {$set: 'Successfully added!'}
                });
            }
        case GOODS_DEL_ELEM:
            // index - index of item which will be deleted from ca  tegory array 
            let index = state.goods.indexOf(action.ElemToDeleteSubCategory);
            return update(state,{
                goods: {$splice: [[index,1]]},
                status: { $set: 'success'},
                statusText: {$set: 'Successfully deleted!'}
            })
        default:
            return state;
    }

} 