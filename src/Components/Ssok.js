import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';

const Ssok = ({ ssokData, isOwner }) => {
  const [editing, setEditing] = useState(false); //수정하고 있는지 아닌지에 대한 상태
  const [newSsok, setNewSsok] = useState(ssokData.text); //input값을 수정할 수 있는 상태값, 초기값=수정하기 전에 있던 텍스트
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
    <div>
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
        <>
          <div>{ssokData.text}</div>
          {ssokData.attachmentURL && (
            <img src={ssokData.attachmentURL} width="50px" height="50px" />
          )}
          {isOwner && ( //글쓴 사람일 경우에만 수정, 삭제 버튼이 보일 수 있도록 체크
            <>
              <button type="button" onClick={onDelete}>
                삭제
              </button>
              <button type="button" onClick={toggleEditing}>
                수정
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Ssok;
