import { Button } from "@mui/material";

const Footer = () => {
  return (
    <footer className="bg-white shadow fixed bottom-0 w-full">
      <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 All Rights Reserved
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Button href="#" className="mr- md:mr-6 ">
              About
            </Button>
          </li>
          <li>
            <Button href="#" className="mr-4 md:mr-6">
              Privacy Policy
            </Button>
          </li>
          <li>
            <Button href="#">Contact</Button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
