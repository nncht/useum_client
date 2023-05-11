import axios from "axios";

const API_URL = "http://localhost:5005";

const handleFileUpload = (setImageUrl, e, setUploadingImage) => {
  const uploadData = new FormData();

  uploadData.append("imageUrl", e.target.files[0]);

  setUploadingImage(true);

  axios
    .post(`${API_URL}/upload`, uploadData)
    .then((response) => {
      setImageUrl(response.data.fileUrl);
      setUploadingImage(false);
      console.log("File uploaded successfully: ", response)
    })
    .catch((err) => {
      console.log("Error while uploading the file: ", err);
      setUploadingImage(false); // Set uploadingImage back to false in case of an error
    });
  }


const ImageUploader = ({ setImageUrl, message, setUploadingImage }) => {
  return (
    <div>
      <div className="row">
        <label className="text-md text-gray-600" htmlFor="image">
          {" "}
          {message}{" "}
        </label>
      </div>

      <div className="row mt-2 mb-4">
        <input
          type="file"
          id="image"
          onChange={(e) => handleFileUpload(setImageUrl, e, setUploadingImage)}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
