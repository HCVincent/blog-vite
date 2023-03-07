import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "tw-elements";

export default function Write() {
  const post = useLocation().state;
  const [des, setDesc] = useState(post?.desc || "");
  const [title, setTitle] = useState(post?.title || "");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [cat, setCat] = useState(post?.cat || "");
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    const desc = getText(des);
    try {
      post
        ? await axios.put(`/posts/${post.id}`, {
            title,
            desc,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="add flex flex-col bg-blue">
      <div className="content w-3/4 mx-auto">
        <input
          className="w-full sborder-b-2 hover:border-gray-500 focus:outline-none  py-2 px-4 block mt-10"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer mt-10  h-80">
          {des !== null && (
            <ReactQuill
              className="editor h-60"
              theme="snow"
              value={des}
              onChange={setDesc}
            />
          )}
        </div>
      </div>
      <div className="h-full w-full bg-blue-100">fsdfasf</div>
      <div className="menu bg-green">
        <div className="item">
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          {file ? (
            <>
              <label className="file" htmlFor="file">
                Upload another Image
              </label>
              <p>image uploaded</p>
            </>
          ) : (
            <>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name=""
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className="flex justify-center space-x-2">
                <label
                  htmlFor="file"
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                  Upload Image
                </label>
              </div>
            </>
          )}
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick} className="bg-red-500">
              Publish
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
}
