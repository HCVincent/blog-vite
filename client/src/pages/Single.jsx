import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "../axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import { AiFillEdit } from "react-icons/Ai";
import { MdDelete } from "react-icons/Md";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="w-90vw mx-auto flex gap-20">
      <div className="content w-2/3 flex-5 flex flex-col gap-12">
        <img
          src={post.img ? `/upload/${post.img}` : "/default.png"}
          alt=""
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="flex items-center gap-4 text-xl">
          {post.userImg && (
            <img
              src={post.userImg}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div className="info">
            <span className="font-medium">{post.username}</span>
            <p className="text-gray-500">{moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit flex items-center gap-4">
              <Link to={`/write`} state={post}>
                <AiFillEdit className="text-black h-20 w-20" />
              </Link>
              <MdDelete
                onClick={handleDelete}
                className="text-black h-20 w-20"
              />
            </div>
          )}
        </div>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-lg">{post.desc}</p>
      </div>
      <Menu cat={post.cat} className="" />
    </div>
  );
};
export default Single;
