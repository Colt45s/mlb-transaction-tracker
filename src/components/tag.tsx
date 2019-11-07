import React from 'react';
import styled from 'styled-components';
import { pickColorByCodeType } from '../utils/color';

type Props = {
  code: string;
  type: string;
  className?: string;
};

const View = (props: Props) => (
  <span className={props.className}>{props.type}</span>
);

export const Tag = styled(View)`
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  color: #fff;
  background-color: ${props => pickColorByCodeType(props.code) || '#343a40'};
`;
