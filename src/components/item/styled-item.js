import styled from 'styled-components';

export const ListItem = styled.li`
  padding: 5px 7px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;

export const ItemContent = styled.div`
  cursor: pointer;
`;

export const DeleteButton = styled.span`
  cursor: pointer;
  &:hover {
    color: red;
  }
`