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

const CreateCollectionForm = () => {
  return (
    <div>
      <SectionHeader title="Create new collection"></SectionHeader>
    </div>
  );
};

export default CreateCollectionForm;
