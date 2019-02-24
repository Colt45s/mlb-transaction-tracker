import React from 'react'
import { State } from './useTransactions'
import {
  CellMeasurer,
  CellMeasurerCache,
  ListRowProps,
  Index
} from 'react-virtualized'
import ContentsWrapper from './contentsWrapper'

type Props = {
  state: State
}

const cache = new CellMeasurerCache({
  minHeight: 160,
  fixedWidth: true
})

export const useInfiniteLoader = ({ state }: Props) => {
  const renderRow = ({ index, key, parent, style }: ListRowProps) => {
    const transaction = state.transactions[index]
    const error = state.error
    const isLoaded = isRowLoaded({ index })

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        <ContentsWrapper
          style={style}
          transaction={transaction}
          isLoaded={isLoaded}
          error={error}
        />
      </CellMeasurer>
    )
  }

  const infiniteRowCount = () => {
    return state.isLoading
      ? state.transactions.length
      : state.transactions.length + 1
  }

  const isRowLoaded = ({ index }: Index) => {
    return !!state.transactions[index]
  }

  return {
    renderRow,
    infiniteRowCount,
    isRowLoaded,
    cache
  }
}
