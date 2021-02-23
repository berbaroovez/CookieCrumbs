import React, { useState, useEffect } from "react";
import firebase, { storage } from "@/lib/firebase";
import { submitOrder } from "@/lib/db";

export default function fileUpload() {
  const [files, setFiles] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      // add an "id" property to each File object
      setFiles((prevState) => [...prevState, newFile]);
    }
  };

  // function onFileChange(e) {
  //   const file = e.target.files[0];

  //   for (var i = 0; i < e.target.files.length; i++) {
  //     console.log(e.target.files[i].name);
  //     setFiles((prevState) => [...prevState, e.target.files[i]]);
  //   }

  //   //   const storageRef = firebase
  //   //     .app()
  //   //     .storage("gs://cookiecrumbsbeta.appspot.com")
  //   //     .ref();
  //   //   const fileRef = storageRef.child(file.name);
  //   //   await fileRef.put(file);
  //   //   setFileUrl(await fileRef.getDownloadURL());
  // }

  const uploadFile = async () => {
    let promises = [];

    files.forEach((file) => {
      let storageRef = firebase
        .app()
        .storage("gs://cookiecrumbsbeta.appspot.com")
        .ref(`order/12321312313/${file.name}`);
      promises.push(
        storageRef.put(file).then((snapshot) => {
          return snapshot.ref.getDownloadURL();
        })
      );
    });

    return Promise.all(promises);
    // const fileRef = storageRef.child([files]);
    // await fileRef.put(files);
    // setFileUrl(await fileRef.getDownloadURL());
  };

  async function onSubmit(e) {
    e.preventDefault();
    console.log(files);
    var yolo = await uploadFile();
    console.log(yolo);
    // submitOrder({ fileUrl });
  }

  return (
    <>
      {/* <form onSubmit={onSubmit}>
        <input
          className="fileBtn"
          type="file"
          onChange={onFileChange}
          multiple
        />
        <Input type="text" placeholder="yolo" mt={8} />
        <button>Upload</button>
      </form> */}
    </>
  );
}
