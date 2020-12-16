import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'

interface ContainerProps {
  hasError: boolean
  isFocused: boolean
  isFilled: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 0 16px;
  width: 100%;
  color: #666360;

  & + & {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  ${props =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;
    padding: 16px 0;

    height: 100%;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 8px;
  }
`

export const Error = styled(Tooltip)`
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`
