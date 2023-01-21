import React from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../actions/postActions";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <section className="w-5/6 mx-auto py-16">
      <div className="w-full py-12 flex flex-col-reverse md:grid gap-8  lg:grid-cols-3">
        <div className="my-4 col-span-2">
          <Posts setCurrentId={setCurrentId}  />
        </div>
        <div className="my-4 col-span-1 ">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </section>
  );
};

export default Home;
