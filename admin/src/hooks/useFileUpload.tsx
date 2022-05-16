import { useState } from "react";

import { StorageReference, uploadBytesResumable } from "firebase/storage";

const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);

  const upload = (storageRef: StorageReference, file: File, metadata = {}) => {
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case "paused":
            setPaused(true);
            setRunning(false);
            break;
          case "running":
            setPaused(false);
            setRunning(true);
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            setError(true);
            break;
          case "storage/canceled":
            setError(true);
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            setError(true);
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }
    );
  };

  return { progress, running, paused, upload, error };
};

export default useFileUpload;
