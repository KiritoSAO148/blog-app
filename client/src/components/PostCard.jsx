/* eslint-disable react/prop-types */
import { AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
export default function PostCard({ post, topImg }) {
  // console.log(post);
  const handleView = async () => {
    window.location.href = `/post/${post.slug}`;
  };
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[380px] transition-all">
      {topImg && <img src={topImg} className="absolute w-10 right-0" />}
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[200px] w-full object-cover group-hover:h-[180px] transition-all duration-300 z-20 rounded-lg"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row items-center gap-2">
              <FaEye />
              <p>{post?.view}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <AiFillLike />
              <p>{post?.like?.length}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <span className="italic text-sm">{post.category}</span>
          <span className="italic text-dm text-gray-400">
            {dayjs(post?.createdAt).format("DD-MM-YYYY")}
          </span>
        </div>
        <Link
          // to={`/post/${post.slug}`}
          onClick={handleView}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
