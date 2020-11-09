import React from 'react';
import styled from 'styled-components';
import TextArea from 'components/Editor/TextArea';
import Button from 'components/Button';

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 5px 0;
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 100%;
  color: inherit;
  padding: 5px;
`;

const EditSsok = ({ onSubmit, setNewSsok, newSsok, toggleEditing }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextArea setSsok={setNewSsok} ssok={newSsok} />
      <ButtonWrap>
        <Button buttonWidth="100px" isFullButton={false} gap="0 5px">
          <ButtonStyle type="button" onClick={toggleEditing}>
            취소
          </ButtonStyle>
        </Button>
        <Button buttonWidth="100px" isFullButton={true}>
          <ButtonStyle type="submit">완료</ButtonStyle>
        </Button>
      </ButtonWrap>
    </form>
  );
};

export default React.memo(EditSsok);
