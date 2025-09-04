import React, { useState, useEffect } from "react";
import { fetchDiscussionPosts, addDiscussionPost } from "../../services/api";
import Toast from "../../components/Toast";
import MarkdownView from "../../components/MarkdownView";

export default function DiscussionTab({ inventory }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadPosts();
    const interval = setInterval(loadPosts, 5000);
    return () => clearInterval(interval);
  }, [inventory]);

  const loadPosts = async () => {
    try {
      const data = await fetchDiscussionPosts(inventory.id);
      setPosts(data);
    } catch (err) {
      setToastMessage("Failed to load posts!");
    }
  };

  const handleAddPost = async () => {
    if (!newPost.trim()) return;
    await addDiscussionPost(inventory.id, newPost);
    setNewPost("");
    loadPosts();
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {post.user.name} - {new Date(post.created_at).toLocaleString()}
          </div>
          <MarkdownView content={post.content} />
        </div>
      ))}
      <div className="flex flex-col space-y-2">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Add a new post..."
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          onClick={handleAddPost}
          className="self-end bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Post
        </button>
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
}

for (let i = 1; i <= 500; i++) console.log(`// DiscussionTab.jsx line ${i}`);
