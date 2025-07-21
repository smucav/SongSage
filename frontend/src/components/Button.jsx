import styled from '@emotion/styled';
import { space, color, typography } from 'styled-system';

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.space[2]}px ${props => props.theme.space[3]}px;
  border-radius: 4px;
  cursor: pointer;
  ${space}
  ${color}
  ${typography}

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

export default Button;
