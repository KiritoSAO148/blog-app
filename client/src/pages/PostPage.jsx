import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { postApi } from "../utils/api/postApi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [isUserLike, setIsUserLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setLikeCount(data.posts[0]?.like?.length);
          setLoading(false);
          setError(false);
          postApi.updateView(data.posts[0]?._id);

          if (data.posts[0]?.like?.includes(user?._id)) setIsUserLike(true);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);

        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };

      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  const handleLike = async () => {
    if (!post || !user) return;
    try {
      await postApi.likePost(post?._id, user?._id);
      setIsUserLike(!isUserLike);

      if (isUserLike) setLikeCount(likeCount - 1);
      else setLikeCount(likeCount + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>

      <div>
        <p className="font-bold text-gray-400 italic">
          Lượt xem: {post?.view || 0}
        </p>
        <div className="flex flex-row  gap-3">
          <p className="font-bold text-gray-400 italic">
            Lượt thích: {likeCount || 0}
          </p>
          <button className="" onClick={handleLike}>
            {!isUserLike ? (
              <AiOutlineLike size={20} />
            ) : (
              <AiFillLike
                size={20}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
              />
            )}
          </button>
        </div>
      </div>

      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 max-h-[600px] w-full object-cover rounded-lg"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content break-words whitespace-pre-wrap overflow-hidden text-ellipsis"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>
        <div className="flex gap-10 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
