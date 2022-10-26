import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 30px;
  cursor: pointer;
  display: inline-block;
`;

const EmojiButton = ({ children, spin = false, ...props }) => (
  <Button {...props}>
    <span classname={spin && 'spin'}>{children}</span>
  </Button>
);

export default EmojiButton;
