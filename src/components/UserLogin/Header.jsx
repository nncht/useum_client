import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center text-slate-700">
        <LoginIcon sx={{ fontSize: 60 }} />
      </div>
      <h2 className="mt-6 text-center text-3xl text-slate-700">{heading}</h2>
      <p className="text-center text-sm text-gray-600 mt-3">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-blue-600 hover:text-cyan-500 "
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
