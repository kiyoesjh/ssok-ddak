import React, { useCallback, useEffect, useState } from 'react';
import Ssok from 'components/Ssok/Ssok';
import { useParams } from 'react-router-dom';
import { dbService } from 'fbase';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import Container from 'components/Container';
import tags from 'category';
import Header from 'components/Header';

const ColumnWrap = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  ${device.mobile} {
    width: 80%;
  }
  ${device.tablet} {
    columns: unset;
  }
  ${device.laptop} {
    width: 100%;
    column-count: 3;
    column-gap: 15px;
  }
`;

const ResultSearch = ({ userObject }) => {
  const [filterData, setFilterData] = useState([]);
  const { tag } = useParams();
  const searchCategory = useCallback(async () => {
    const categorySsok = await dbService
      .collection('ssok')
      .where('category', '==', tag)
      .orderBy('createdAt')
      .get();
    const filterArr = categorySsok.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFilterData(filterArr);
  }, [tag]);

  useEffect(() => {
    searchCategory();
  }, [searchCategory]);

  return (
    <Container>
      <Header headText={tags[tag]} />
      <ColumnWrap>
        <Wrap>
          {filterData.map((ssok) => (
            <Ssok
              key={ssok.id}
              ssokData={ssok}
              isOwner={ssok.creatorId === userObject.uid}
            />
          ))}
        </Wrap>
      </ColumnWrap>
    </Container>
  );
};

export default ResultSearch;
