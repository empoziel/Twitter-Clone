import Nav from "./../components/Nav";
import Aside from "./../components/Aside";
import Main from "./../components/Main";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const Feed = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    // get active user data from firebase and import to state
    onAuthStateChanged(auth, (res) => {
      setUser(res);
    });
  }, []);
  return (
    <div className="feed h-screen bg-black overflow-hidden ">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
