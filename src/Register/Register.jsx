import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const Register = () => {
  const { createUser, setUpdate, update } = useContext(AuthContext);
  const [eye, setEye] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photoUrl");
    const password = form.get("password");

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters !");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must have an Uppercase letter!");
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password must have a Lowercase letter!");
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUpdate(!update);
          })
          .catch();
        e.target.reset();
        navigate(location?.state ? location.state : "/");
        toast.success("Registered Successful!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Sign Up Failed!");
      });
    // console.log(name,email,photo,password);
  };
  const handelSeePass = () => {
    setEye(!eye);
  };
  return (
    <div className="container mx-auto mb-8">
      <div className="hero min-h-screen font-poppins mt-[68px] z-10 ">
        <div className="flex flex-col md:flex-row-reverse  border-2 md:rounded-2xl border-[#297045] w-full ">
          <div className="text-center lg:text-left w-full md:w-[1/2] min-h-64  bg-[url('https://i.ibb.co/wQc3BmY/undraw-Access-account-re-8spm-2.png')] bg-center bg-cover shadow-xl  md:rounded-r-2xl flex justify-center items-center  ">
            <div className="backdrop-blur-sm bg-white/5 w-full h-64 md:h-full  md:min-h-full md:rounded-r-2xl">
              <div className="text-center md:h-full h-64 md:min-h-full flex justify-center items-center flex-col md:rounded-r-2xl">
                <h1 className="text-3xl md:text-5xl font-bold text-black rounded-2xl">
                  Register now!
                </h1>
                <div className="py-6  text-black opacity-80  space-y-4">
                  <p>
                    Your journey to exceptional real estate experiences starts
                    here!
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* */}
          <div
            onSubmit={handleRegister}
            className="card shrink-0 w-full md:w-1/2    bg-base-100 rounded-l-none rounded-r-none rounded-2xl md:rounded-l-2xl"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
          >
            <form className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <Link
                  onClick={handelSeePass}
                  className="text-2xl absolute right-3 top-[48px]"
                >
                  {eye ? <FaRegEye /> : <FaRegEyeSlash />}
                </Link>
              </div>
              <p>
                <span className="font-bold">Note : </span>
                <small className="text-black opacity-80">
                  Your password must be at least{" "}
                  <span className="text-[#297045]">6 characters</span> and
                  includes{" "}
                  <span className="text-[#297045]">
                    an Uppercase and a Lowercase
                  </span>{" "}
                  character.
                </small>
              </p>
              <div className="form-control mt-6">
                <button className="btn bg-[#297045]  text-white">
                  Register
                </button>
              </div>

              <p className="text-center font-roboto text-lg">
                Already Registered to Sweet Stay? Please{" "}
                <Link
                  to="/login"
                  className="font-bold text-[#297045] hover:text-[#88ce52]"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;