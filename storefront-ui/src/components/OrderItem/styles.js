import styled from 'styled-components'

export const OrderProductItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 10px;
  align-items: self-start;
`
export const OrderProductItemLeading = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 16px;
  padding-right: 16px;
`

export const OrderProductItemTrailing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
