import styled from 'styled-components'

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 10px;
  align-items: self-start;
`

export const CartItemLeading = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 16px;
  padding-right: 16px;
`

export const CartItemTrailing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
