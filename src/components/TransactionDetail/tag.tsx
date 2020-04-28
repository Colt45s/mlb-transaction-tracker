import React from 'react';
import styled from 'styled-components';

type Props = {
  color: string;
  type: string;
  className?: string;
};

const View: React.FC<Props> = props => (
  <span className={props.className}>{props.type}</span>
);

export const Tag = React.memo(styled(View)`
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 100%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  color: #fff;
  background-color: ${props => props.color};
`);
