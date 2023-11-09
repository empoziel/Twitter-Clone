import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const Feed = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          signOut(auth).then((res) => {
            navigate("/");
          });
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Feed;
