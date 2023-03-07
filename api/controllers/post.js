import { db } from "../db.js";
import jwt from "jsonwebtoken";

import { promisify } from "util";
const JWT_SECRET = process.env.JWT_SECRET;
const query = promisify(db.query).bind(db);
const verify = promisify(jwt.verify).bind(jwt);

export const getPosts = async (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  try {
    const data = await query(q, [req.query.cat]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getPost = async (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  try {
    const data = await query(q, [req.params.id]);
    if (!data[0]) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  try {
    const userInfo = await verify(token, JWT_SECRET);

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    await query(q, [values]);
    return res.json("Post has been created.");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = await verify(token, JWT_SECRET);

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
    const result = await query(q, [postId, userInfo.id]);

    if (result.affectedRows === 0) {
      return res.status(403).json("You can delete only your post!");
    }

    return res.json("Post has been deleted!");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  try {
    const userInfo = await verify(token, JWT_SECRET);

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    await query(q, [...values, postId, userInfo.id]);
    return res.json("Post has been updated.");
  } catch (err) {
    return res.status(500).json(err);
  }
};
