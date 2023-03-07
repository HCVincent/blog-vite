import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../axios";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="home bg-white h-full">
      <div className="posts w-5/6 mx-auto pt-10">
        {posts.map((post) => (
          <Link className="link" to={`/post/${post.id}`} key={post.id}>
            <h1>{`${post.img}`}</h1>
            <div className="post hero mb-20 p-10 group rounded-lg hover:bg-sky-500 hover:ring-sky-500 hover:scale-110 hover:duration-150">
              <div className="flex flex-row justify-between items-center w-full h-full relative">
                <img
                  src={post.img ? `${post.img}` : "/default.png"}
                  //The max-width and margin utilities (max-w-sm and mx-auto)
                  // to constrain the card width and center it horizontally
                  className="max-w-sm rounded-lg shadow-2xl left-0"
                />
                <div className="textContent flex flex-col h-full w-full pl-10 justify-between">
                  <div>
                    <h1 className="text-6xl group-hover:text-white font-bold">
                      {post.title}
                    </h1>

                    <p className="py-10 text-5xl text-base line-clamp-3 group-hover:text-white">
                      {post.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
