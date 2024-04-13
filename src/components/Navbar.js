import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Setuser } from "../redux/user";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Add your Place", href: "/smartPark/add-spot" },
    { name: "Planner", href: "/planner" },
    { name: "Trips", href: "/trips" },
  ];
  const handleLogout = () => {
    dispatch(Setuser(null));
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-50 rounded-lg bg-gray-400 border-gray-100"
    >
      {() => (
        <>
          <div className="mx-auto px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setOpen(!open)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <p className="text-dark font-bold text-2xl flex items-center">
                      TrippZy
                    </p>
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}
                    {user ? (
                      <button
                        className="hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/auth/login"
                        className="hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <button
                  className="hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  className="hover:bg-gray-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
