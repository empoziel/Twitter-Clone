import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [mail, setMail] = useState(" ");
  const [showErr, setShowErr] = useState(false);

  //if users account already open
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/feed");
    }
  });

  //form sending event
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    setMail(email);
    const pass = e.target[1].value;

    if (signUp) {
      //create account
      createUserWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          navigate("/feed");
          toast.success("Your account has been created successfully");
        })
        .catch((err) => {
          toast.error(`Something went wrong. Error code : ${err.code}`);
        });
    } else {
      //login account
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          navigate("/feed");
          toast.success("Login successful.");
        })
        .catch((err) => {
          //if password is wrong  make state true
          if (err.code === "auth/invalid-login-credentials") {
            setShowErr(true);
          }
          toast.error(`Something went wrong. Error code : ${err.code}`);
        });
    }
  };

  // after the login access to results

  //sign in with google
  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);

      toast.success("Login with Google successful");
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  // send reset password mail
  const handleReset = () => {
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        toast.info(`Password reset mail sent to ${mail}`);
      })
      .catch((error) => {
        const errorCode = error.code;

        toast.error(`Sorry something went wrong :${errorCode}`);
      });
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[75px]" src="/x-logo.webp" alt="twitter-logo" />
        </div>
        <h1 className="text-center font-bold text-xl">Sign in Twitter</h1>

        <div
          onClick={handleGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full curser-pointer gap-3 text-black hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.png" alt="google-logo" />
          <span className="whitespace-nowrap">Sign in With Google</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
            required
          />
          <label className="mt-5">Password</label>
          <input
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
            required
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300 ">
            {signUp ? "Register" : "Login"}
          </button>

          <p className="mt-5 flex gap-4">
            <span className="text-gray-500">
              {signUp ? "I have account" : "I dont have account"}
            </span>
            <span
              onClick={() => setSignUp(!signUp)}
              className="text-blue-500 cursor-pointer"
            >
              {signUp ? "Login" : "Register"}
            </span>
          </p>
        </form>

        {/*if pass wrong */}
        {showErr && (
          <p
            onClick={handleReset}
            className="text-red-400 cursor-pointer text-center"
          >
            Forgot your password ?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
