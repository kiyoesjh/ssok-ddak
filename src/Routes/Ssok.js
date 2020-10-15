import { dbService } from 'fbase';
import React, { useState } from 'react';

const Ssok = ({ ssokData, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSsok, setNewSsok] = useState(ssokData.text);
  const deleteSsok = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    if (ok) {
      await dbService.doc(`ssok/${ssokData.id}`).delete();
    }
  };
  const updateSsok = ({ target: { value } }) => setNewSsok(value);
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
      {editing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={updateSsok}
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
          {isOwner && (
            <>
              <button type="button" onClick={deleteSsok}>
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
