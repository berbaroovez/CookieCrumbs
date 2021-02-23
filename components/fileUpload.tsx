import React from "react";
import firebase, { storage } from "@/lib/firebase";

export default function fileUpload() {
  async function onFileChange(e) {
    const file = e.target.files[0];
    console.log(storage);
    // const storageRef = firebase.storage().ref();
    // const fileRef = storageRef.child(file.name);
    // fileRef.put(file).then(() => {
    //   console.log("File is uploaded");
    // });
    // await fileRef.put(file);
    // const fileUrl = await fileRef.getDownloadURL();
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <input type="text" placeholder="yolo" />
        <button>Upload</button>
      </form>
    </>
  );
}
