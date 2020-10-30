import { storageService } from 'fbase';
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
  const attachmentRef = storageService.ref().child(`${uid}/${uuidv4()}`);
  const response = await attachmentRef.putString(attachment, 'data_url');
  return await response.ref.getDownloadURL();
};
