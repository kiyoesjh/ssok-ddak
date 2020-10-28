import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import MorePop from '../MorePop';
import device from 'styles/deviceSize';

const PostWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto 15px;
  break-inside: avoid;
`;

const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  border-bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
  background-color: #fff;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserPhoto = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  > img {
    width: 100%;
    height: auto;
  }
`;

const UserName = styled.div`
  margin-left: 10px;
`;

const PostContent = styled.div`
  position: relative;
`;

const PostText = styled.p`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  color: ${({ fontColor }) => fontColor};
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'RIDIBatang';
  text-align: center;
  z-index: 10;
  ${device.tablet} {
    font-size: 1.2rem;
  }
  ${device.laptop} {
    font-size: 0.95rem;
  }
`;

const PostImgWrap = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: ${({ isImg }) => (isImg ? 'none' : '1px solid #ddd')};
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    ${({ isImg }) => (isImg ? `content: ''` : null)};
  }
`;

const PostImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const LayerButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  &:hover {
    background-color: #ddd;
  }
`;

const IconText = styled.span`
  padding-left: 8px;
`;

const EmptyDiv = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: #fff;
  color: #000;
`;

const Ssok = ({ ssokData, isOwner }) => {
  const [editing, setEditing] = useState(false); //수정하고 있는지 아닌지에 대한 상태
  const [newSsok, setNewSsok] = useState(ssokData.text); //input값을 수정할 수 있는 상태값, 초기값=수정하기 전에 있던 텍스트
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    if (ok) {
      await dbService.doc(`ssok/${ssokData.id}`).delete(); //doc(경로) => collection 안에 document 가 있기 때문에 'collection이름/document 아이디'로 작성
      await storageService.refFromURL(ssokData.attachmentURL).delete(); //refFromURL => 입력받은 url을 firebase 가 storage 안에서 url reference 를 찾아 그 reference로 리턴하는 method
    }
  };
  const onUpdate = ({ target: { value } }) => setNewSsok(value);
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`ssok/${ssokData.id}`).update({
      text: newSsok,
    });
    setEditing(false);
  };
  return (
    <>
      {editing ? ( //수정하기를 눌렀다면? 폼이 나오게 된다.
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onUpdate}
            value={newSsok}
            required
            placeholder="Write your mind"
          />
          <button type="button" onClick={toggleEditing}>
            취소
          </button>
          <button type="submit">완료</button>
        </form>
      ) : (
        <PostWrap>
          <UserInfoWrap>
            <UserInfo>
              <UserPhoto>
                <img src={ssokData.creatorPhoto} />
              </UserPhoto>
              <UserName>{ssokData.creatorName}</UserName>
            </UserInfo>
            {isOwner && ( //글쓴 사람일 경우에만 수정, 삭제 버튼이 보일 수 있도록 체크
              <>
                <MorePop setIsOpen={setIsOpen} isOpen={isOpen}>
                  <LayerButton type="button" onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <IconText>삭제하기</IconText>
                  </LayerButton>
                  <LayerButton type="button" onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faEdit} />
                    <IconText>수정하기</IconText>
                  </LayerButton>
                </MorePop>
              </>
            )}
          </UserInfoWrap>
          <PostContent>
            <PostText fontColor={ssokData.attachmentURL ? '#fff' : '#000'}>
              {ssokData.text}
            </PostText>
            <PostImgWrap isImg={Boolean(ssokData.attachmentURL)}>
              {ssokData.attachmentURL ? (
                <PostImg src={ssokData.attachmentURL} />
              ) : (
                <EmptyDiv />
              )}
            </PostImgWrap>
          </PostContent>
        </PostWrap>
      )}
    </>
  );
};

export default Ssok;
