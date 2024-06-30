import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { postApi } from "../utils/api/postApt";
import { TopSlider } from "../components/PostSlider";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    const getTopPosts = async () => {
      try {
        const [top] = await Promise.all([
          postApi.getTopPosts(),
          // postApi.getNewPosts(),
        ]);
        setTopPosts(top);
      } catch (error) {
        console.log(error);
      }
    };
    getTopPosts();
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

      <div className="py-5 px-10 mx-auto">
        <TopSlider posts={topPosts} />
      </div>

      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      {/* <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {newPosts && posts.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center">New Posts</h2>
            <div className="flex gap-8">
              {posts?.slice(0, 4).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div> */}
      {/* <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex gap-8">
              {posts?.slice(0, 4).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div> */}
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-14">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
