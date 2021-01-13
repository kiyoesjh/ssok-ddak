// import { storageService, dbService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';

export const onFileChange = ({ target: { files } }, setAttachment) => {
  const theFile = files[0];
  const reader = new FileReader();
  reader.onloadend = (finishedEvent) => {
    const {
      currentTarget: { result },
    } = finishedEvent;
    setAttachment(result);
  };
  reader.readAsDataURL(theFile);
};

export const uploadFileURL = async (uid, attachment) => {
  // const attachmentRef = storageService.ref().child(`${uid}/${uuidv4()}`);
  // const response = await attachmentRef.putString(attachment, 'data_url');
  // return await response.ref.getDownloadURL();
};

export const onDelete = async (ssokData) => {
  const ok = window.confirm('삭제하시겠습니까?');
  if (ok) {
    try {
      await dbService.doc(`ssok/${ssokData.id}`).delete(); //doc(경로) => collection 안에 document 가 있기 때문에 'collection이름/document 아이디'로 작성
      if (!ssokData.attachmentURL) return;
      await storageService.refFromURL(ssokData.attachmentURL).delete(); //refFromURL => 입력받은 url을 firebase 가 storage 안에서 url reference 를 찾아 그 reference로 리턴하는 method
      console.log('성공!');
    } catch {
      console.log('삭제 도중 에러 발생했습니다.');
    }
  }
};
