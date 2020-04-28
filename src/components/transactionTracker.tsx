import React, { useReducer } from 'react';
import {
  InfiniteLoader,
  WindowScroller,
  AutoSizer,
  List,
  InfiniteLoaderChildProps,
  WindowScrollerChildProps
} from 'react-virtualized';
import { useTransactions } from './_hooks/useTransactions';
import { useInfiniteLoader } from './_hooks/useInfiniteLoader';

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
  error: any;
  items: Row[];
};

export type Action =
  | { type: 'SUCCESS'; payload: { items: Row[] | [] } }
  | { type: 'ERROR'; payload: { error: any } };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        items: state.items.concat(action.payload.items)
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload.error
      };
    default:
      throw new Error('no such action type');
  }
}

export default () => {
  const [{ items, error }, dispatch] = useReducer(reducer, {
    error: null,
    items: []
  });
  const fetcher = useTransactions(dispatch);
  const [renderRow, isRowLoaded, cache] = useInfiniteLoader({
    items,
    error
  });

  return (
    <InfiniteLoader
      threshold={0}
      isRowLoaded={isRowLoaded}
      loadMoreRows={fetcher}
      rowCount={items.length + 1}
    >
      {({ onRowsRendered, registerChild }: InfiniteLoaderChildProps) => (
        <WindowScroller>
          {({
            height,
            isScrolling,
            scrollTop,
            onChildScroll
          }: WindowScrollerChildProps) => (
            <div
              style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '0 1rem',
                backgroundColor: '#fff'
              }}
            >
              <AutoSizer disableHeight={true}>
                {({ width }) => (
                  <List
                    ref={registerChild}
                    deferredMeasurementCache={cache}
                    autoHeight={true}
                    height={height}
                    width={width}
                    rowCount={items.length + 1}
                    rowHeight={cache.rowHeight}
                    rowRenderer={renderRow}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    onRowsRendered={onRowsRendered}
                  />
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
};
