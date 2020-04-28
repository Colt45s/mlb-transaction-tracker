import React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const View: React.FC<Props> = props => (
  <div className={props.className}>{props.children}</div>
);

export const Header = styled(View)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
