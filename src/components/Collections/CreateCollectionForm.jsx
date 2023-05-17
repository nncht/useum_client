import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import API_URL from "../../services/apiConfig";

// Custom components
import ImageUploader from "../ImageUploader/ImageUploader";
import SelectCategories from "../SelectCategories";
import SectionHeader from "../UI/SectionHeader";

// MUI imports
import Button from "@mui/material/Button";

// --- End of imports

const CreateCollectionForm = ({ target, idObject, forCollection }) => {
  const { user } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [comment, setComment] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (uploadingImage) {
      return;
    }

    const params = {
      name: name,
      description: description,
      createdBy: user._id,
      imageUrl: imageUrl,
      categories: categoryArray,
      commentTitle: commentTitle,
      comment: comment,
      collections: forCollection,
    };

    axios
      .post(`${API_URL}/${target}`, params, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setName("");
        setDescription("");
        setImageUrl("");
        setCategoryArray([]);
        setComment([]);
        navigate(`/${target}/${res.data[idObject]._id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fixedInputClass =
    "w-full px-3 py-2 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

  return (
    currentUser && (
      <div className="my-3">
        <SectionHeader title="Create new collection"></SectionHeader>

        <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
          <input type="hidden" name="forCollection" value={forCollection} />

          {/* Collection title */}
          <label htmlFor="name" className="text-md">
            Name
          </label>
          <input
            type="text"
            id="name"
            className={fixedInputClass}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input type="hidden" name="" value={currentUser._id} />

          {/* Collecion description */}
          <label htmlFor="description" className="text-md">
            Description
          </label>
          <textarea
            id="description"
            className={fixedInputClass}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          {/* Collection category selection */}
          <SelectCategories
            setCategoryArray={setCategoryArray}
            categoryArray={categoryArray}
          />

          {/* Upload collection cover picture */}
          {/* Upload preview */}
          {uploadingImage === true ? (
            <p>Uploading image, please wait...</p>
          ) : (
            <img
              src={imageUrl !== "" ? imageUrl : "/images/default/no-image.svg"}
              width={250}
              height={350}
              alt=""
            />
          )}

          {/* Choose file */}
          <ImageUploader
            setImageUrl={setImageUrl}
            setUploadingImage={setUploadingImage}
            message={"Upload a cover picture"}
          />

          {/* Create collection button */}
          <div>
            <Button variant="contained" type="submit" className="text-xl mt-3">
              Create collection
            </Button>
          </div>
        </form>

        {/* Error message */}
        <div className="my-2">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
      </div>
    )
  );
};

export default CreateCollectionForm;
