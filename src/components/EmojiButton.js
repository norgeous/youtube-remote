import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 25px;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmojiButton = ({ children, spin = false, ...props }) => (
  <Button {...props}>
    <div className={spin && 'spin'}>{children}</div>
  </Button>
);

export default EmojiButton;
