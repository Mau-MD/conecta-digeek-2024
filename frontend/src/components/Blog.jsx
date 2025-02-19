import React, { useEffect, useCallback } from "react";
import { getSinglePost } from "../services/functions";
import { useState } from "react";
import Markdown from "react-markdown";
import { RiAccountCircleFill } from "react-icons/ri";
import LoadingSpinner from "./LoadingSpinner";

function Blog({ blogId }) {
  const [blog, setBlog] = useState(undefined);

  const fetchBlog = useCallback(async () => {
    const post = await getSinglePost(blogId);
    setBlog(post.data);
  }, [setBlog]);

  useEffect(() => {
    fetchBlog();
  }, []);
  console.log(blog);

  if (blog === undefined) return <LoadingSpinner />;

  return (
    <div className="flex flex-col py-12 mt-[50px]">
      <div className="prose max-w-none md:p-0 p-8 md:w-[50%] m-auto flex flex-col">
        <h1>{blog.titulo}</h1>
        <h1 className="text-gray-600 text-xl font-light">{blog.summary}</h1>
        <img
          src={blog.image}
          className="w-full max-h-[600px] object-cover m-auto"
        />
        <div className="border-t-[2px] border-b-[2px] mt-8 flex text-xs py-4 flex-col md:flex-row justify-between gap-2 md:gap-0">
          <div className="flex h-full  ">
            {/* <RiAccountCircleFill className="h-[50px] w-auto text-[#7678FF]" /> */}
            <img
              src={blog.author.image}
              className="w-[50px] m-0 border-none h-[50px] border-2 rounded-full"
            />
            <div className="flex flex-col  justify-between py-[2px] ml-4">
              <div className="text-lg font-bold">{blog.author.name}</div>
              <div className="text-md">
                {new Date(blog.date_created).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className="flex items-end h-full py-[2px]">
            Actualizado por ultima vez el{" "}
            {new Date(blog.date_created).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
        <Markdown>{blog.content}</Markdown>
      </div>
    </div>
  );
}

export default Blog;
