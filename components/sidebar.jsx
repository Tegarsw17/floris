import Link from "next/link";
import { setLogout } from "../middleware/utils";
import {
  AiOutlineDashboard,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  RiArchiveDrawerLine,
  RiDashboard3Line,
  RiLogoutCircleLine,
  RiNotification2Line,
  RiPlantLine,
  RiSettings3Line,
  RiUser3Line,
} from "react-icons/ri";

function handleOnClickLogout(e) {
  setLogout(e);
}

const Sidebar = () => {
  return (
    <div className="flex w-80 bg-[#49D299]">
      {/* Sidebar Content */}
      <div className="h-5/6 w-full m-4 p-2 text-[#f7f7f7]">
        <div className="flex justify-between">
          <h2>
            <AiOutlineDashboard className="inline pb-1 mr-3" />
            Floris
          </h2>
          <h2>
            <AiOutlineMenu />
          </h2>
        </div>
        <form method="post">
          <div className="flex bg-[#49D299] rounded h-11 my-8 items-center p-2 shadow-xl shadow-[#40a77c] border-slate-400 text-[#f7f7f7]">
            <AiOutlineSearch className="text-lg mr-3" />
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="bg-[#49D299] placeholder:text-[#f7f7f7] outline-none"
            />
            {/* <div className="text-lg">Search</div> */}
          </div>
        </form>
        <div className="">
          <ul className="text-lg p-2">
            <li>
              <Link className="text-[#f7f7f7] no-underline" href="/dashboard">
                <div className="flex flex-row items-center py-2">
                  <RiDashboard3Line className="mr-2" />
                  Dashboard
                </div>
              </Link>
            </li>
            <li>
              <Link className="text-[#f7f7f7] no-underline" href="/dashboard">
                <div className="flex flex-row items-center py-2">
                  <RiUser3Line className="mr-2" />
                  User
                </div>
              </Link>
            </li>
            <li>
              <Link className="text-[#f7f7f7] no-underline" href="/dashboard">
                <div className="flex flex-row items-center py-2">
                  <RiPlantLine className="mr-2" />
                  Plant
                </div>
              </Link>
            </li>
            <li>
              <Link className="text-[#f7f7f7] no-underline" href="/dashboard">
                <div className="flex flex-row items-center py-2">
                  <RiArchiveDrawerLine className="mr-2" />
                  Warehouse
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="text-lg p-2">
            <li>
              <Link className="text-[#f7f7f7] no-underline" href="/dashboard">
                <div className="flex flex-row items-center py-2">
                  <RiNotification2Line className="mr-2" />
                  Notification
                </div>
              </Link>
            </li>
            <li>
              <Link className="text-[#f7f7f7] no-underline" href="/dashboard">
                <div className="flex flex-row items-center py-2">
                  <RiSettings3Line className="mr-2" />
                  Setting
                </div>
              </Link>
            </li>
            <li>
              <Link
                className="text-[#f7f7f7] no-underline"
                onClick={(e) => handleOnClickLogout(e)}
                href="#"
              >
                <div className="flex flex-row items-center py-2">
                  <RiLogoutCircleLine className="mr-2" />
                  Logout
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
