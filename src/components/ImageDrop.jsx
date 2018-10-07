import React from "react";
import ReactDropzone from "react-dropzone";
import firebase from "../api/firebase";
import uploadFile from "../api/uploadFile";

export default class ImageDrop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      uploading: false,
      progress: null
    };
  }

  onDrop = files => {
    // POST to a test endpoint for demo purposes
    const file = files[0];

    this.setState({ file });
    this.uploadToFirebase(file);
  };

  uploadToFirebase = file => {
    const uploadTask = uploadFile({ file });
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        this.setState({
          progress,
          uploading: true
        });
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            this.setState({
              uploading: true
            });
            break;
        }
      },
      error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.props.onChange("icon", downloadURL);
          console.log("changed props to ", downloadURL);
          this.setState({
            uploading: false
          });
        });
      }
    );
  };
  render() {
    const { file, uploading } = this.state;
    const initialPreview = this.props.currentImage;
    const { previewClassName } = this.props

    return (
      <div className="image-drop">
        <ReactDropzone className='upload-btn' onDrop={this.onDrop}>
          Add Card Image
        </ReactDropzone>

        {uploading && (
          <h2>uploading! {Math.round(this.state.progress)}% complete </h2>
        )}
      </div>
    );
  }
}
