import React from "react";
// import { BiLoaderCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.postReducer);

  return (
    <section className="w-full">
      <div className="w-full grid gap-8 md:grid-cols-2">
        {!posts.length ? (
          <h2 className="text-xl font-bold text-secondary-500 flex justify-center items-center gap-4">
            Loading....
          </h2>
        ) : (
          posts.map((postItem) => (
            <div key={postItem._id}>
              <Post postItem={postItem} setCurrentId={setCurrentId} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Posts;
