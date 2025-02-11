import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const StatusBadge = styled.div`
  color: #ffffff;
  background-color: #ffbe00;
  padding: 5px;
  width: auto;
  border-radius: 50px;
  width: fit-content;
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding-right: 16px;
  padding-left: 16px;
`

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
