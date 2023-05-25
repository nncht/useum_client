import axios from "axios";
import API_URL from "../../services/apiConfig";

const storedToken = localStorage.getItem("authToken");

const handleFileUpload = (setImageUrl, e, setUploadingImage) => {
  const uploadData = new FormData();

  uploadData.append("imageUrl", e.target.files[0]);

  setUploadingImage(true);

  axios
    .post(`${API_URL}/upload`, uploadData,
    {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
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
