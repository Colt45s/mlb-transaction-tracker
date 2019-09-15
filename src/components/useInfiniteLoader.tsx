import React, { useCallback, useMemo } from 'react';
import { State } from './useTransactions';
import {
  CellMeasurer,
  CellMeasurerCache,
  ListRowProps,
  Index
} from 'react-virtualized';
import ContentsWrapper from './contentsWrapper';

type Props = {
  state: State;
};

const cache = new CellMeasurerCache({
  minHeight: 160,
  fixedWidth: true
});

export const useInfiniteLoader = ({ state }: Props) => {
  const infiniteRowCount = useMemo(() => {
    const transactionsLength = state.transactions.length;

    return state.isLoading ? transactionsLength : transactionsLength + 1;
  }, [state.isLoading, state.transactions.length]);

  const isRowLoaded = useCallback(
    ({ index }: Index) => {
      return !!state.transactions[index];
    },
    [state.transactions]
  );

  const renderRow = useCallback(
    ({ index, key, parent, style }: ListRowProps) => {
      const transaction = state.transactions[index];
      const error = state.error;
      const isLoaded = isRowLoaded({ index });

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
      );
    },
    [isRowLoaded, state.error, state.transactions]
  );

  return {
    renderRow,
    infiniteRowCount,
    isRowLoaded,
    cache
  };
};
