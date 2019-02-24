import React from 'react'
import {
  InfiniteLoader,
  WindowScroller,
  AutoSizer,
  List,
  InfiniteLoaderChildProps,
  WindowScrollerChildProps
} from 'react-virtualized'
import { useTransactions } from './useTransactions'
import { useInfiniteLoader } from './useInfiniteLoader'

export default () => {
  const { state, fetchTransactions } = useTransactions()
  const { renderRow, infiniteRowCount, isRowLoaded, cache } = useInfiniteLoader(
    {
      state
    }
  )

  return (
    <InfiniteLoader
      threshold={0}
      isRowLoaded={isRowLoaded}
      loadMoreRows={fetchTransactions}
      rowCount={infiniteRowCount()}
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
                    rowCount={state.transactions.length + 1}
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
  )
}
