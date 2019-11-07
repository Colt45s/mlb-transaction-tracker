import React from 'react';
import {
  InfiniteLoader,
  WindowScroller,
  AutoSizer,
  List,
  InfiniteLoaderChildProps,
  WindowScrollerChildProps
} from 'react-virtualized';
import { useTransactions } from './useTransactions';
import { useInfiniteLoader } from './useInfiniteLoader';

export function TransactionTracker() {
  const [items, fetcher, loading, error] = useTransactions();
  const [renderRow, infiniteRowCount, isRowLoaded, cache] = useInfiniteLoader({
    items,
    loading,
    error
  });

  return (
    <InfiniteLoader
      threshold={0}
      isRowLoaded={isRowLoaded}
      loadMoreRows={fetcher}
      rowCount={infiniteRowCount}
    >
      {({ onRowsRendered, registerChild }: InfiniteLoaderChildProps) => (
        <WindowScroller>
          {({
            height,
            isScrolling,
            scrollTop,
            onChildScroll
          }: WindowScrollerChildProps) => (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
}
