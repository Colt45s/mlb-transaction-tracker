import {
  useSelector as reactReduxUseSelector,
  TypedUseSelectorHook
} from 'react-redux';
import { RootState } from '../reducers';

export const useSelector: TypedUseSelectorHook<
  RootState
> = reactReduxUseSelector;
