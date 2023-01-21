import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postActions";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.postReducer.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user) {
    return (
      <p>Please sign in to create own memories..</p>
    )
  }

  return (
    <section className="w-full">
      <div className="border border-gray-300 bg-white p-3  rounded-md">
        <div>
          {currentId ? (
            <h2 className="text-center my-3 text-lg text-secondary-500 font-semibold">
              Editing A Memory
            </h2>
          ) : (
            <h2 className="text-center my-3 text-lg text-secondary-500 font-semibold">
              Create A Memory
            </h2>
          )}
        </div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="inputStyles"
            placeholder="Title.."
            required
            id=""
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <input
            type="text"
            name="message"
            className="inputStyles"
            required
            placeholder="Message.."
            id=""
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <input
            type="text"
            required
            name="tags"
            className="inputStyles"
            placeholder="Tags.."
            id=""
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <div className="inputStyles">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>

          <button className="w-full text-sm my-2">SUBMIT</button>
        </form>
        <button className="w-full text-sm bg-secondary-100" onClick={clear}>
          CLEAR
        </button>
      </div>
    </section>
  );
};

export default Form;
