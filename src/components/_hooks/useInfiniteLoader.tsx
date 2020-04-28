import React, { useCallback } from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  ListRowProps,
  Index
} from 'react-virtualized';
import { Row } from '../transactionTracker';
import { Loading } from '../Loading';
import { Transaction } from '../Transaction';
import { MainContent } from '../MainContent';

type Props = {
  items: Row[];
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
  ({ index }: Index) => boolean,
  CellMeasurerCache
] {
  const isRowLoaded = useCallback(
    ({ index }: Index) => {
      return index < props.items.length;
    },
    [props.items]
  );

  const renderRow = useCallback(
    ({ index, key, parent, style }: ListRowProps) => {
      const transaction = props.items[index];

      let content: JSX.Element;

      if (props.error) {
        content = <div>No Results</div>;
      } else if (index >= props.items.length) {
        content = <Loading />;
      } else {
        content = <Transaction transaction={transaction} />;
      }

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          <MainContent style={style}>{content}</MainContent>
        </CellMeasurer>
      );
    },
    [props.error, props.items]
  );

  return [renderRow, isRowLoaded, cache];
}
