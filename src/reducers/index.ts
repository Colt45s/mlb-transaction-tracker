import { combineReducers } from 'redux';
import {
  reducer as transactionReducer,
  State as TransactionState
} from './transaction';

export type RootState = {
  transaction: TransactionState;
};

export const rootReducer = combineReducers({
  transaction: transactionReducer
});
