import React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const View: React.FC<Props> = props => (
  <div className={props.className}>
    <div>{props.children}</div>
  </div>
);

export const RightAlign = styled(View)`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;

  > * {
    margin-left: auto;
  }
`;
