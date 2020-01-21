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
  minHeight: 180,
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
      const isLoaded = isRowLoaded({ index });

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
            isRowLoaded={isLoaded}
            error={props.error}
            loading={props.loading}
          />
        </CellMeasurer>
      );
    },
    [isRowLoaded, props.error, props.items, props.loading]
  );

  return [renderRow, infiniteRowCount, isRowLoaded, cache];
}
