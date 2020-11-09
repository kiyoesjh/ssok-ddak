import React from 'react';
import styled from 'styled-components';
import device from 'styles/deviceSize';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(300px, auto));
  grid-auto-rows: minmax(300px, auto);
  gap: 10px;
  max-width: 1000px;
  margin: 0 auto 50px;
  padding: 15px 10px;
  width: 100%;
  ${device.mobile} {
    width: 80%;
  }
  ${device.laptop} {
    padding: 50px 10px;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fill, minmax(200px, auto));
    grid-auto-rows: minmax(200px, auto);
  }
`;

const Card = styled.div`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.cardColor};
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const UserProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.lightColor};
`;

const UserName = styled.span`
  width: 60px;
  height: 20px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.lightColor};
`;

const Content = styled.div`
  display: flex;
  height: calc(100% - 50px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  width: ${({ width }) => width};
  height: 20px;
  background-color: ${({ theme }) => theme.lightColor};
  margin: 5px 0;
`;

const HomeSkeleton = () => {
  const cardArr = [0, 1, 2, 3];
  return (
    <Container>
      {cardArr.map((n) => (
        <Card key={n}>
          <Profile>
            <UserProfile />
            <UserName />
          </Profile>
          <Content>
            <Text width="80%" />
            <Text width="60%" />
          </Content>
        </Card>
      ))}
    </Container>
  );
};

export default HomeSkeleton;
