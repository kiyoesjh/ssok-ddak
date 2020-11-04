import React from 'react';
import Header from 'components/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from 'components/Container';
import device from 'styles/deviceSize';

const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0 60px;
  ${device.tablet} {
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const ListWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(200px, auto));
  grid-auto-rows: minmax(200px, auto);
  gap: 10px;
  width: 90%;
  margin: 0 auto;
  ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, minmax(200px, auto));
  }
`;

const List = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme, category }) => theme.categoryColor[category]};
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: 'RIDIBatang';
  font-size: 1.5rem;
`;

const Search = () => {
  return (
    <Container>
      <Header headText="검색" />
      <Content>
        <ListWrap>
          <List>
            <ListLink category="empathy" to="">
              공감
            </ListLink>
          </List>
          <List>
            <ListLink category="affirmation" to="">
              확언
            </ListLink>
          </List>
          <List>
            <ListLink category="lyrics" to="">
              가사
            </ListLink>
          </List>
          <List>
            <ListLink category="quotation" to="">
              책구절
            </ListLink>
          </List>
          <List>
            <ListLink category="other" to="">
              기타
            </ListLink>
          </List>
        </ListWrap>
      </Content>
    </Container>
  );
};

export default Search;
