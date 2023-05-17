import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import API_URL from "../../services/apiConfig";

// Custom components
import ImageUploader from "../ImageUploader/ImageUploader";
import SelectCategories from "../SelectCategories";
import SectionHeader from "../UI/SectionHeader";
import CreateItemSearch from "./CreateItemSearch";

// MUI imports
import Button from "@mui/material/Button";

// --- End of imports

const CreateitemForm = ({ target, idObject, foritem }) => {
  const { user } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [uploadingImage, setUploadingImage] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Uploading cover images is optional
    if (uploadingImage) {
      return;
    }

    const params = {
      name: name,
      description: description,
      createdBy: user._id,
      imageUrl: imageUrl,
      categories: categoryArray,
      items: foritem,
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

        navigate(`/${target}/${res.data[idObject]._id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fixedInputClass =
    "w-full p-2 mt-1 mb-3 border border-slate-800 placeholder-gray-300 text-slate-800";

  return (
    currentUser && (
      <div className="mb-3">
        <SectionHeader title="Create new item"></SectionHeader>

        <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
          <input type="hidden" name="foritem" value={foritem} />

          {/* Search for existing item */}
          <div className="pb-10">
            <p>Search for an item in the database</p>
            <CreateItemSearch />
          </div>

          {/* item title */}
          <label htmlFor="name" className="text-md">
            Item Name
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
            Comment
          </label>
          <textarea
            id="comment"
            className={fixedInputClass}
            value={description} // needs update!
            rows={4}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Let the community know your thoughts about this item, e.g. why you're using it, or whether you think it's good or not. Anything goes!"
          />

          {/* item category selection */}
          <label htmlFor="description" className="text-md pb-1">
            Categories
          </label>
          <SelectCategories
            setCategoryArray={setCategoryArray}
            categoryArray={categoryArray}
          />

          {/* Upload item cover picture */}
          {/* Upload preview */}
          <div className="py-4">
            {uploadingImage === true ? (
              <p>Uploading image, please wait...</p>
            ) : (
              <img
                src={
                  imageUrl !== "" ? imageUrl : "/images/default/no-image.svg"
                }
                width={250}
                height={350}
                alt=""
              />
            )}
          </div>

          {/* Choose file */}
          <ImageUploader
            setImageUrl={setImageUrl}
            setUploadingImage={setUploadingImage}
            message={"Upload a cover picture"}
          />

          {/* Create item button */}
          <div>
            <Button variant="contained" type="submit" className="text-xl mt-3">
              Add item
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

export default CreateitemForm;
