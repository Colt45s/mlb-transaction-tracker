import React, { CSSProperties } from 'react';
import { Row } from '../reducers/transaction';
import { Transaction } from './transaction';
import styled from 'styled-components';

type Props = {
  style: CSSProperties;
  transaction: Row;
  isRowLoaded: boolean;
  error: any;
  loading: boolean;
  className?: string;
};

const View = (props: Props) => (
  <div style={props.style} className={props.className}>
    {props.error ? (
      <div>No Results</div>
    ) : props.loading ? (
      <div>Loading</div>
    ) : props.isRowLoaded ? (
      <Transaction transaction={props.transaction} />
    ) : (
      <div>No Results</div>
    )}
  </div>
);

export const Content = styled(View)`
  border-bottom: 1px solid #eee;
`;
