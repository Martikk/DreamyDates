import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import Logo from "../Assets/DreamyDates.svg";

const Footer = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const content = (
    <div className="lg:hidden block absolute bottom-16 w-full left-0 right-0 backdrop-blur-xl bg-white/30 transition">
      <ul className="text-center text-xl p-20">
        <Link to="/Contact-us">
          <li className="my-4 py-4 border-b border-teal-300 hover:bg-teal-300 hover:rounded">
            Contact
          </li>
        </Link>
        <Link to="/Dates">
          <li className="my-4 py-4 border-b border-teal-300 hover:bg-teal-300 hover:rounded">
            Dates
          </li>
        </Link>
        <Link to="/MarriageProposal">
          <li className="my-4 py-4 border-b border-teal-300 hover:bg-teal-300 hover:rounded">
            Marriage proposal
          </li>
        </Link>
        <Link to="/surprises">
          <li className="my-4 py-4 border-b border-teal-300 hover:bg-teal-300 hover:rounded">
            Surprices
          </li>
        </Link>
        <Link to="/Flowers">
          <li className="my-4 py-4 border-b border-teal-300 hover:bg-teal-300 hover:rounded">
            Flowers
          </li>
        </Link>
      </ul>
    </div>
  );

  return (
    <footer className="relative">
      <div className="h-20 flex justify-between z-50 text-black lg:px-10 px-4 py-4">
        <div className="flex items-center flex-1">
          <Link to="/">
            <img
              src={Logo}
              alt="Dreamy Dates Logo"
              className="h-8 w-auto min-w-[230px] pr-10"
            />
          </Link>
        </div>
        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div>
            <ul className="flex gap-8 mr-5 text-[18px]">
              <Link to="/Contact-us">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  Contact
                </li>
              </Link>
              <Link to="/Dates">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  Dates
                </li>
              </Link>
              <Link to="/MarriageProposal">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  Proposal
                </li>
              </Link>
              <Link to="/surprises">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  Surprices
                </li>
              </Link>
              <Link to="/Flowers">
                <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">
                  Flowers
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div>{click && content}</div>
        <button
          className="block sm:hidden transition pr-8"
          onClick={handleClick}
        >
          {click ? <FaTimes /> : <CiMenuBurger />}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
