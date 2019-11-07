import React, { useCallback, useMemo } from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  ListRowProps,
  Index
} from 'react-virtualized';
import { Content } from './content';
import { Row } from '../reducers/transaction';

type Props = {
  items: Row[];
  loading: boolean;
  error: any;
};

const cache = new CellMeasurerCache({
  fixedHeight: true,
  minHeight: 160,
  fixedWidth: true
});

export function useInfiniteLoader(
  props: Props
): [
  ({ index, key, parent, style }: ListRowProps) => JSX.Element | null,
  number,
  ({ index }: Index) => boolean,
  CellMeasurerCache
] {
  const infiniteRowCount = useMemo(() => {
    const transactionsLength = props.items.length;

    return props.loading ? transactionsLength : transactionsLength + 1;
  }, [props.items.length, props.loading]);

  const isRowLoaded = useCallback(
    ({ index }: Index) => {
      return !!props.items[index];
    },
    [props.items]
  );

  const renderRow = useCallback(
    ({ index, key, parent, style }: ListRowProps) => {
      const transaction = props.items[index];
      const error = props.error;
      const isLoaded = isRowLoaded({ index });

      if (!transaction) {
        return null;
      }

      if (!Object.keys(transaction).length) {
        return null;
      }

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          <Content
            style={style}
            transaction={transaction}
            isLoaded={isLoaded}
            error={error}
          />
        </CellMeasurer>
      );
    },
    [isRowLoaded, props.error, props.items]
  );

  return [renderRow, infiniteRowCount, isRowLoaded, cache];
}
