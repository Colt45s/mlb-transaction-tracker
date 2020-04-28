import React, { CSSProperties } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  style: CSSProperties;
};

const View: React.FC<Props> = props => (
  <div style={props.style} className={props.className}>
    {props.children}
  </div>
);

export const MainContent = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    padding: 0.5rem;
  }
`;
