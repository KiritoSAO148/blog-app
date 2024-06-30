/* eslint-disable react/prop-types */
import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, TextInput, Textarea } from "flowbite-react";
import { Navigate } from "react-router-dom";

const Comment = ({ comment: cmt, onLike, onEdit, onDelete, postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(cmt.content);
  const [isReply, setIsReply] = useState(false);
  const [content, setContent] = useState("");
  const [comment, setCurrentComment] = useState(cmt);

  useEffect(() => {
    const getUser = async () => {
      if (comment?.userId?._id) return setUser(comment.userId);
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        // onEdit(comment, editedContent);
        setCurrentComment((prev) => ({
          ...prev,
          content: editedContent,
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        Navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        // if (currentUser._id === data.userId) {
        //   setCurrentComment((prev) => (prev._id === data?._id ? data : prev));
        // }

        setCurrentComment(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReply = async () => {
    if (!content || content.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentId: comment?._id,
          content,
          postId,
          userId: currentUser?._id,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setIsReply(false);
        setContent("");
        setCurrentComment((prev) => ({
          ...prev,
          children: [...prev.children, data],
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const render = (comment) => (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture || "placeholder.jpg"} // Replace with a placeholder image URL
          alt={user.username || "Anonymous User"}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Anonymous User"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => handleLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes?.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  `${comment.numberOfLikes} ${
                    comment.numberOfLikes === 1 ? "like" : "likes"
                  }`}
              </p>

              {/* {currentUser && (
                <button
                  type="button"
                  onClick={() => setIsReply(true)}
                  className="text-gray-400 hover:text-blue-500"
                >
                  Reply
                </button>
              )}

              {currentUser && currentUser._id === comment.userId._id && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="text-gray-400 hover:text-blue-500"
                >
                  Edit
                </button>
              )}

              {currentUser &&
                (currentUser._id === comment.userId._id ||
                  currentUser.isAdmin) && (
                  <button
                    type="button"
                    onClick={() => onDelete(comment._id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                )} */}

              {currentUser && (
                <button
                  type="button"
                  onClick={() => setIsReply(true)}
                  className="text-gray-400 hover:text-blue-500"
                >
                  Reply
                </button>
              )}

              {currentUser &&
                (currentUser._id === comment.userId ||
                  currentUser._id === comment.userId?._id ||
                  currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
        {isReply && (
          <div className="mt-3 flex flex-row gap-2">
            <TextInput
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handleReply}>Send</Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {render(comment)}
      <div className="ml-5 border-l-2">
        {comment?.children?.length
          ? comment.children.map((item) => (
              <Comment
                key={item._id}
                comment={item}
                onLike={onLike}
                onEdit={onEdit}
                onDelete={onDelete}
                postId={postId}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Comment;
