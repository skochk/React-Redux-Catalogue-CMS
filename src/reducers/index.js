import { combineReducers } from 'redux';

import categoryReducer from './categoryReducer';
import subcategoryReducer from './subcategoryReducer';
import goodsReducer from './goodsReducer';
import {reducer as formReducer} from 'redux-form';
 
export default combineReducers({
  categoryReducer,
  subcategoryReducer,
  goodsReducer,
  form: formReducer,
});