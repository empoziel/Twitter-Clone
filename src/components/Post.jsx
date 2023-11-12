import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { auth, db } from "../firebase/config";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Dropdown from "./Dropdown";

const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  //Shows how long ago it was created
  const date = moment(tweet.createdAt?.toDate()).fromNow();

  //check the user like  or unlike
  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);

    setIsLiked(found);
  }, [tweet]);

  //delete tweet
  const handleDelete = async () => {
    if (confirm("Do you confirm deletion?")) {
      //get the tweet reference you want to delete
      const docRef = doc(db, "tweets", tweet.id);
      // delete doc
      await deleteDoc(docRef);
    }
  };

  // like and unlike
  const toggleLike = async () => {
    const docRef = doc(db, "tweets", tweet.id);

    await updateDoc(docRef, {
      likes: isLiked
        ? // delete id from likes array
          arrayRemove(auth.currentUser.uid)
        : //add id to likes array
          arrayUnion(auth.currentUser.uid),
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      isEdited: true,
      textContent: e.target[0].value,
    });

    setIsEditMode(false);
  };

  return (
    <div className="flex gap-3 p-3 border-b[1] border-gray-600">
      <img
        className="w-14 h-14 rounded-full"
        src={tweet.user.photo}
        alt="user_picture"
      />
      <div className="w-full">
        {/* top sec- user data */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">@{tweet.user.name.toLowerCase()}</p>
            <p className="text-gray-400">{date}</p>
          </div>
          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleDelete={handleDelete}
              handleEdit={() => setIsEditMode(true)}
            />
          )}
        </div>
        {/* middle sec- tweet content */}
        <div className="my-3">
          {isEditMode ? (
            <form onSubmit={handleSave}>
              <input
                className="text-black "
                type="text"
                defaultValue={tweet.textContent}
              />
              <button type="button" onClick={() => setIsEditMode(false)}>
                Reject
              </button>
              <button type="submit">Save</button>
            </form>
          ) : (
            <p>{tweet?.textContent}</p>
          )}
          {/* if user post photo print the screen */}
          {tweet.imageContent && (
            <img
              className="w-full object-contain max-h-[300px] mt-3 rounded-lg"
              src={tweet?.imageContent}
            />
          )}
        </div>
        {/* bottom sec- intractions & buttons */}
        <div className="flex items-center justify-between ">
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#0099ff4f]">
            <BiMessageRounded />
            {/* <span> {Math.round(Math.random() * 200)}</span> */}
          </div>
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00ff1139]">
            <FaRetweet />
            {/* <span> {Math.round(Math.random() * 100)}</span> */}
          </div>
          <div
            onClick={toggleLike}
            className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#ff000055]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="flex gap-1 items-center p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#d2bbbb37]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
