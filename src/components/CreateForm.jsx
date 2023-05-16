import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ImageUploader from "./ImageUploader/ImageUploader";
import Button from "@mui/material/Button";
import SelectCategories from "./SelectCategories";
import API_URL from "../services/apiConfig";


function CreateForm({ target, idObject, forCollection }) {
  const { user } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [comment, setComment] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  //Apparently it doesn't matter if we fetch the user or not cause the user info is in the token...

  // useEffect(() => {
  //   if (user && user._id) {
  //     axios
  //       .get(`${API_URL}/users/${user._id}`)
  //       .then((res) => {
  //         setCurrentUser(res.data);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // }, [user]);


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
      comments: comment,
      collections: forCollection,
    };

    axios
      .post(`${API_URL}/${target}`, params, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
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
    "rounded-md appearance-none relative block w-full px-3 py-2 my-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

  return (
    currentUser && (
      <div className="my-3">
        <form className="flex flex-col w-75 mx-auto" onSubmit={handleSubmit}>
          <h4 className="text-2xl text-slate-600 my-3">Create Item</h4>
          <input type="hidden" name="forCollection" value={forCollection} />
          <label htmlFor="name" className="text-xl">
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
          <label htmlFor="description" className="text-xl">
            Description
          </label>
          <textarea
            id="description"
            className={fixedInputClass}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <label htmlFor="categoryArray" className="text-xl">
            Category
          </label>

          <SelectCategories
            setCategoryArray={setCategoryArray}
            categoryArray={categoryArray}
          />
          <label htmlFor="review" className="text-xl mt-3">
            Comment
          </label>
          <textarea
            id="review"
            className={fixedInputClass}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />

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

          <ImageUploader
            setImageUrl={setImageUrl}
            setUploadingImage={setUploadingImage}
            message={"Upload a picture"}
          />
          <div>
            <Button variant="contained" type="submit" className="text-xl mt-3">
              Add
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
}

export default CreateForm;
