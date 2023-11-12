import { useEffect, useState } from "react";
import Form from "./Form";
import Post from "./Post";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import Loading from "./Loading";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  const tweetsCol = collection(db, "tweets");

  useEffect(() => {
    //desc filter setting
    const options = query(tweetsCol, orderBy("createdAt", "desc"));

    onSnapshot(options, (snapshot) => {
      const tempTweets = [];

      snapshot.forEach((doc) => {
        tempTweets.push({ ...doc.data(), id: doc.id });
      });

      //transfer data to state
      setTweets(tempTweets);
    });
  }, []);

  return (
    <main className="border border-gray-900 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-[#80808045]">
        HomePage
      </header>
      {/* form */}
      <Form user={user} />

      {!tweets ? (
        <Loading />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
