import styled from "styled-components"

export const Grid = styled.div`
`

export const Row = styled.div`
  display: flex;
`

export const Col = styled.div`
  flex: ${(props) => props.size};
`

export const Wrapper = styled.div`
  padding-left: 10em;
  padding-right: 10em;
  height: 100%;
  display: flex;
  flex-direction: column;
`;