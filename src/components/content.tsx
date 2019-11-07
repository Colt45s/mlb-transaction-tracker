import React, { CSSProperties } from 'react';
import { Row } from '../reducers/transaction';
import { Transaction } from './transaction';
import styled from 'styled-components';

type Props = {
  style: CSSProperties;
  transaction: Row;
  isLoaded: boolean;
  error: any;
  className?: string;
};

const View = (props: Props) => {
  return (
    <div style={props.style} className={props.className}>
      {props.error ? (
        <div>No Results</div>
      ) : props.isLoaded ? (
        <Transaction transaction={props.transaction} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export const Content = styled(View)`
  border-bottom: 1px solid #eee;
`;
