import { setLogout } from "../middleware/utils";

function handleOnClickLogout(e) {
  setLogout(e);
}

const Navbar = ({ name }) => {
  return (
    <nav className="flex bg-[#f7f7f7] justify-between items-center px-3 border-b-4">
      <p>Good Evening, {name}</p>
      <a
        onClick={(e) => handleOnClickLogout(e)}
        className="cursor-pointer text-[#393E46] no-underline"
      >
        Logout
      </a>
    </nav>
  );
};

export default Navbar;
