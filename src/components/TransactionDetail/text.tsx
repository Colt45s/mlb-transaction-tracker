import React from 'react';
import styled from 'styled-components';

type Props = {
  fontSize: string;
  color?: string;
  className?: string;
};

const View: React.FC<Props> = props => (
  <p className={props.className}>{props.children}</p>
);

export const Text = styled(View)`
  font-size: ${props => props.fontSize};
  color: ${props => props.color || 'inherit'};
`;
