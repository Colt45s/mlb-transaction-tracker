import { Action } from '../actions/transaction';

export type Row = {
  player_id: string;
  player: string;
  team: string;
  note: string;
  from_team: string;
  type: string;
  type_cd: string;
};

export type State = {
  items: Row[];
};

const initialState = {
  items: []
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'FETCH_TRANSACTION_SUCCESS':
      return {
        ...state,
        items: state.items.concat(action.payload.items)
      };
    default:
      return state;
  }
}
