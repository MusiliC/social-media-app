import React from "react";
import { HiThumbUp, HiTrash, HiMenu } from "react-icons/hi";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/postActions";

const user = JSON.parse(localStorage.getItem("profile"));

const Post = ({ postItem, setCurrentId }) => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-md shadow-sm ">
      {/* image */}
      <div className="relative">
        <div className="absolute w-full z-10 bg-gray-100 opacity-90 flex justify-between gap-4 py-1 px-2 items-center">
          <div>
            <p className=" font-semibold">{postItem.name}</p>
            <p className="text-sm font-semibold">
              {moment(postItem.updatedAt).fromNow()}
            </p>
          </div>
          
          {(user?.result?.googleId === postItem?.creator ||
            user?.result?._id === postItem.creator) && (
          <HiMenu
            size={25}
            className="font-semibold  hover:cursor-pointer"
            onClick={() => setCurrentId(postItem._id)}
          />)}
        </div>
        <img
          src={postItem.selectedFile}
          alt=""
          className="w-full object-cover h-[200px]"
        />
      </div>

      {/* desc */}

      <div className="py-3 px-5">
        <p className="text-sm mb-2 text-secondary-500 font-semibold italic">
          {postItem.tags.map((tag) => `#${tag} `)}
        </p>
        <h2 className="mb-1  mx-auto  font-semibold tracking-tight text-gray-900">
          {postItem.title}
        </h2>
        <h2 className="mb-3  mx-auto text-sm  font-semibold tracking-tight text-secondary-500">
          {postItem.message}
        </h2>
        <div className="flex justify-between items-center gap-4  my-2">
          <div
            className="flex items-center gap-1 hover:cursor-pointer"
            onClick={() => dispatch(likePost(postItem._id))}
          >
            <HiThumbUp
              size={20}
              color="blue"
              className=" rounded-sm  hover:bg-primary-500"
            />
            <p className="text-sm text-primary-100 font-bold">{`Like ${postItem.likes.length}`}</p>
          </div>

          {(user?.result?.googleId === postItem?.creator ||
            user?.result?._id === postItem.creator) && (
            <div
              className="text-sm text-secondary-100 font-semibold flex items-center gap-1 hover:cursor-pointer"
              onClick={() => dispatch(deletePost(postItem._id))}
            >
              <HiTrash size={20} /> Delete
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
