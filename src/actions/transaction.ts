import { Row } from '../reducers/transaction';

export type Action = ReturnType<typeof fetchTransactionSuccess>;

export function fetchTransactionSuccess(items: Row[] | []) {
  return {
    type: 'FETCH_TRANSACTION_SUCCESS',
    payload: {
      items
    }
  };
}
