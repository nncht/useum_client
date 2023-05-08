import axios from "axios";

const API_URL = "http://localhost:5005";

const handleFileUpload = (setImageUrl, e) => {
  const uploadData = new FormData();

  uploadData.append("imageUrl", e.target.files[0]);

  axios
    .post(`${API_URL}/upload`, uploadData)
    .then((response) => {
      setImageUrl(response.data.fileUrl);
    })
    .catch((err) => console.log("Error while uploading the file: ", err));
};

const ImageUploader = ({ setImageUrl, message }) => {
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
          onChange={(e) => handleFileUpload(setImageUrl, e)}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
