import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import API_URL from "../../services/apiConfig";
import { Configuration, OpenAIApi } from "openai";

// Custom components
import ImageUploader from "../ImageUploader/ImageUploader";
import SelectCategories from "../SelectCategories";

// MUI imports
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// --- End of imports

const CreateitemForm = ({ target, idObject, forCollection }) => {
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
  const [aiErrorMessage, setAiErrorMessage] = useState(undefined);

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const createChatCompletion = async (name) => {
    try {
      const configuration = new Configuration({
        organization: import.meta.env.VITE_APP_OPENAI_ORGANIZATION_KEY,
        apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
      });

      delete configuration.baseOptions.headers["User-Agent"];
      const openai = new OpenAIApi(configuration);

      const messages = [
        {
          role: "system",
          content: `You are creating an item named "${name}"`,
        },
        {
          role: "user",
          content: `Describe the item "${name}" in detail with at least 40 words`,
        },
      ];

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });

      const generatedDescription = completion.data.choices[0].message.content;
      console.log(generatedDescription);
      setDescription(generatedDescription);
    } catch (error) {
      console.error(error);
      setAiErrorMessage(error.message);
    }
  };

  const waitForDescription = async () => {
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (description !== "") {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  };

  const createDescription = async (name) => {
    console.log("createDescription");
    await createChatCompletion(name);
    await waitForDescription();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //something wrong with headers

    // Uploading cover images is optional
    if (uploadingImage) {
      return;
    }

    let params;

    if (forCollection) {
      params = {
        name: name,
        description: description,
        createdBy: user._id,
        imageUrl: imageUrl,
        categories: categoryArray,
        commentTitle: commentTitle,
        comment: comment,
        collections: forCollection,
        currentUser: currentUser,
      };
    } else {
      params = {
        name: name,
        description: description,
        createdBy: user._id,
        imageUrl: imageUrl,
        categories: categoryArray,
        commentTitle: commentTitle,
        comment: comment,
        currentUser: currentUser,
      };
    }

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
        <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
          <input type="hidden" name="forCollection" value={forCollection} />

          {/* Item title */}
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
          <label htmlFor="comment" className="text-md">
            Comment
          </label>
          <textarea
            id="comment"
            className={fixedInputClass}
            value={comment}
            rows={4}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Let the community know your thoughts about this item, e.g. why you're using it, or whether you think it's good or not. Short or long description, anything goes!"
          />

          {/* item category selection */}
          <label htmlFor="categories" className="text-md pb-1">
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

          {/* Create description button */}
          <label htmlFor="description" className="text-md">
            Description
          </label>
          <textarea
            id="description"
            className={fixedInputClass}
            value={description}
            rows={4}
            onChange={(event) => setDescription(event.target.value)}
          />

          <div>
            <Button
              variant="contained"
              onClick={() => createDescription(name)}
              className="text-xl mt-3"
            >
              Create Description
            </Button>
          </div>

          {/* Create item button */}
          <div>
            <Button variant="contained" type="submit" className="text-xl mt-3">
              Add item
            </Button>
          </div>

          {/* AI error message */}
          <div className="my-2">
            {aiErrorMessage && <p className="text-danger">{aiErrorMessage}</p>}
          </div>

          <div id="main-section" className="p-4">
            <Typography variant="h6" sx={{ color: "red" }}>
              Creating new items works, it just takes a long time before the
              process is finished due to auto-generated descriptions taking a
              while. We still need to add loading spinners, until then give it a
              little time before you'll see the created item.
            </Typography>
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
