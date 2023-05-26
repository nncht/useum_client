import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import API_URL from "../../services/apiConfig";
import { MoonLoader } from "react-spinners";
import { Configuration, OpenAIApi } from "openai";

// Custom components
import ImageUploader from "../ImageUploader/ImageUploader";
import SelectCategories from "../SelectCategories";

// MUI imports
import { Textarea, Input } from "@mui/joy";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDescriptionGenerated, setIsDescriptionGenerated] = useState(false);

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  // -------------------------------------------------------
  // AUTOMATIC DESCRIPTIONS POWERED BY OPENAI API
  // -------------------------------------------------------

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
      setIsDescriptionGenerated(true);
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
    setIsGenerating(true);
    console.log("createDescription");

    try {
      await createChatCompletion(name);
      await waitForDescription();
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // -------------------------------------------------------
    // IMAGE UPLOADS POWERED BY CLOUDINARY
    // -------------------------------------------------------

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

    // -------------------------------------------------------
    // SEND DATA TO BACKEND
    // -------------------------------------------------------

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
      })
      .finally(() => {
        setIsDescriptionGenerated(false);
      });
  };

  // -------------------------------------------------------
  // STYLING
  // -------------------------------------------------------
  const fixedInputClass =
    "w-full rounded p-2 mt-1 mb-3 border border-slate-800 placeholder-gray-300 text-slate-800";

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------
  return (
    currentUser && (
      <div className="mb-3">
        <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
          <input type="hidden" name="forCollection" value={forCollection} />

          {/* ------------------------------ */}
          {/* Item Name */}
          {/* ------------------------------ */}
          <label htmlFor="name" className="text-md">
            <Typography variant="button">Item Name</Typography>{" "}
            <Typography variant="caption">(required)</Typography>
          </label>
          <Input
            type="text"
            size="lg"
            id="name"
            className={fixedInputClass}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input type="hidden" name="" value={currentUser._id} />

          {/* ------------------------------ */}
          {/* Item Category Selection */}
          {/* ------------------------------ */}
          <label htmlFor="categories" className="text-md mt-3 pb-1">
            <Typography variant="button">Categories</Typography>
          </label>

          <SelectCategories
            setCategoryArray={setCategoryArray}
            categoryArray={categoryArray}
          />

          {/* ------------------------------ */}
          {/* Generate Auto-Description */}
          {/* ------------------------------ */}

          <label htmlFor="description" className="text-md mt-3 pt-4">
            <Typography variant="button">Item Description</Typography>
          </label>

          <textarea
            id="description"
            className={fixedInputClass}
            value={description}
            rows={4}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Try our automatic description generation by clicking the Auto-Description button below and wait for the magic to happen."
          />
          {/* Generate Description Button */}
          <div className="flex flex-row gap-2">
            <Button
              variant="outlined"
              onClick={() => createDescription(name)}
              className="text-xl mb-4"
            >
              Auto-Description
            </Button>
            <div className="py-1" key={Date.now()}>
              <MoonLoader
                color="#1976D2"
                size={22}
                loading={isGenerating && !isDescriptionGenerated}
              />
            </div>
          </div>

          {/* OpenAI Error Message */}
          <div className="mb-3">
            {aiErrorMessage && <p className="text-danger">{aiErrorMessage}</p>}
          </div>

          {/* ------------------------------ */}
          {/* Comment */}
          {/* ------------------------------ */}
          <label htmlFor="comment" className="text-md">
            <Typography variant="button">Your Thoughts?</Typography>
          </label>
          <textarea
            id="comment"
            className={fixedInputClass}
            value={comment}
            rows={4}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Let the community know your thoughts about this item, e.g. why you're using it, or whether you think it's good or not. Short or long description, anything goes!"
          />

          {/* ------------------------------ */}
          {/* Upload Item Picture */}
          {/* ------------------------------ */}
          <label htmlFor="categories" className="text-md mt-4 pb-1">
            <Typography variant="button">Upload Item Picture</Typography>{" "}
            <Typography variant="caption">(.JPEG or .PNG)</Typography>
          </label>
          {/* Upload preview */}
          <div className="pb-1">
            {uploadingImage === true ? (
              <MoonLoader color="#1976D2" size={30} />
            ) : (
              <img
                src={
                  imageUrl !== "" ? imageUrl : "/images/default/no-image.svg"
                }
                width={350}
                alt=""
                className="rounded-lg"
              />
            )}
          </div>

          {/* Choose file */}
          <ImageUploader
            setImageUrl={setImageUrl}
            setUploadingImage={setUploadingImage}
          />

          {/* ------------------------------ */}
          {/* SUBMIT ITEM */}
          {/* ------------------------------ */}
          <div className="flex flex-row">
            <Button variant="contained" type="submit" className="text-xl mt-3">
              Add Item
            </Button>
            <div className="mt-3 mx-2 py-1" key={Date.now()}>
              {isLoading && (
                <MoonLoader key={Date.now()} color="#1976D2" size={22} />
              )}
            </div>
          </div>
        </form>

        {/* Error message */}
        <div className="my-4">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
      </div>
    )
  );
};

export default CreateitemForm;
