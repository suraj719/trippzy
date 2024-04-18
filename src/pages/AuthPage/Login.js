import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/alerts";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setMail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
        {
          email: email,
          password: password,
        }
      );
      setIsLoading(false);
      if (response.data.success) {
        toast.success("login successfull");
        localStorage.setItem("token", response.data.data);
        navigate("/trips");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
    dispatch(HideLoading());
  };
  return (
    <>
      <div className="w-full h-[88vh]">
        <div className="flex flex-col items-center h-[90%] justify-center">
          <div className="bg-gray-800 px-5 py-10 rounded-xl w-[27rem]">
            <form className="flex flex-col items-center" onSubmit={handleLogin}>
              <div className="my-4 font-halloween w-full">
                <input
                  type="email"
                  onChange={(e) => setMail(e.target.value)}
                  className="rounded-md text-2xl font-bold outline-none p-2 w-full"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="my-  w-full">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-md password-halloween text-2xl font-bold outline-none p-2 w-full"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="w-full">
                {isLoading ? (
                  <>
                    <button
                      type="submit"
                      className="cursor-wait w-full border text-4xl font-halloween border-white text-xl bg-gray-600 text-white px-10 py-3 mt-8"
                      disabled
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full border text-4xl font-halloween border-white text-xl hover:bg-gray-600 text-white px-10 py-3 mt-8">
                      Login
                    </button>
                  </>
                )}
              </div>
            </form>
            <div className="text-white font-halloween text-2xl text-center mt-4">
              <Link to="/auth/register">
                <p>
                  Don't have an account ?{" "}
                  <span className="text-red-300 font-bold cursor-pointer">
                    Register
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
