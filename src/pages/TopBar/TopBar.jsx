import React, { useEffect, useState } from 'react';
import userImg from "../../assets/userImg.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../Auth/loginSlice';
import { toast } from 'react-toastify';

function TopBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const { isLoading, userInfo } = useSelector(state => state.loginReducer);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo()).unwrap()
      .then((res) => {
        toast.success("success");
      })
      .catch((error) => {
        toast.error("fail");
      });
  }, [])
  const handleLogout = () => {
    // Implement logout functionality here
    localStorage.setItem("token", '')
    navigate('/')
  };

  return (
    <div>
      <header className="text-black  bg-gray-700 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-bold items-center text-white mb-4 md:mb-0 hover:text-gray-200 transition duration-300 ease-in-out">
            <img
              src={userImg}
              alt="user icon"
              className="w-16 h-16 rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <span className="ml-3 text-3xl">{userInfo?.name}</span>
          </a>
          {/* Dropdown Button */}
          <div className="relative ml-auto">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 py-2 focus:outline-none transition duration-300 ease-in-out flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-12 mr-2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 7c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 12c-3.31 0-6-2.69-6-6 0-1.66 1.34-3 3-3h6c1.66 0 3 1.34 3 3 0 3.31-2.69 6-6 6z"></path>
              </svg>
              User Info
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded-lg shadow-lg z-10">
                <div className="py-2 px-4 border-b">
                  <p className="text-sm">Name: {userInfo?.name}</p>
                  <p className="text-sm">Email: {userInfo?.email}</p>
                </div>
                <div className="py-2 px-4">
                  <button
                    onClick={handleLogout}
                    className="w-full text-sm text-red-600 hover:text-red-800 focus:outline-none flex items-center justify-start"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 10l4-4m0 0l-4-4m4 4H3m4 4l-4 4m0 0l4 4m-4-4h14"></path>
                    </svg>
                    Log Out
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default TopBar;
