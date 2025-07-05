import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Share2, Heart, Calendar, Video, Edit, Search, Award, Pin, Trash2 } from 'lucide-react';
import { QATab } from '../components/hub/QATab';
import { BlogsTab } from '../components/hub/BlogsTab';
import { ReelsTab } from '../components/hub/ReelsTab';
import { PollsTab } from '../components/hub/PollsTab';
import { EventsCard } from '../components/hub/EventsCard';
import { AchievementsCard } from '../components/hub/AchievementsCard';
import { StatsCard } from '../components/hub/StatsCard';
import { QuickHelpCard } from '../components/hub/QuickHelpCard';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { HubNoticeAlert } from '../components/hub/HubNoticeAlert';
import { HubTripPlanCard } from '../components/hub/HubTripPlanCard';
import { HubSearchFilterBar } from '../components/hub/HubSearchFilterBar';
import { HubTabNav } from '../components/hub/HubTabNav';

// Import shared types from hubTypes
import { QAPost, QAComment, QAReply, Reel, Poll, Blog } from '../components/hub/hubTypes';

// Unified Post type
type Post = QAPost | Reel | Poll;

const CATEGORIES = ["All", "Arrival", "Housing", "Travel", "Poll", "General"];

export const HubPage = () => {
  const [activeTab, setActiveTab] = useState('qa'); // Default to Q&A tab
  const [newPost, setNewPost] = useState('');
  const [newReel, setNewReel] = useState<string | null>(null);
  const [newReelCaption, setNewReelCaption] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      type: 'post',
      author: 'Sarah M.',
      avatar: '👩‍🎓',
      time: '2 hours ago',
      content: 'Just arrived in Lyon! The campus is amazing and everyone is so helpful. Any tips for opening a bank account here?',
      likes: 12,
      comments: [],
      category: 'Arrival'
    },
    {
      id: 2,
      type: 'reel',
      author: 'John D.',
      avatar: '👨‍🎓',
      time: '3 hours ago',
      videoUrl: 'https://example.com/reel1.mp4',
      caption: 'Exploring Paris on a budget! 🗼',
      likes: 20,
      comments: [],
      category: 'Travel'
    },
    {
      id: 3,
      type: 'poll',
      author: 'Maria L.',
      avatar: '👩‍🔬',
      time: '1 day ago',
      question: 'Best city to study in France?',
      options: [{ text: 'Paris', votes: 10 }, { text: 'Lyon', votes: 5 }],
      likes: 8,
      comments: [],
      category: 'Poll'
    }
  ]);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      author: 'Alex K.',
      title: 'My First Month in France: A Journey',
      time: '5 hours ago',
      content: 'Sharing my experience with the CAF application...',
      likes: 28,
      comments: []
    }
  ]);
  const [newComment, setNewComment] = useState({});

  const upcomingEvents = [
    { id: 1, title: 'Virtual Networking Event', date: 'Dec 15, 2024', time: '7:00 PM CET', attendees: 45 },
    { id: 2, title: 'French Language Exchange', date: 'Dec 18, 2024', time: '6:30 PM CET', attendees: 23 },
    { id: 3, title: 'Live Q&A: Visa Tips', date: 'Dec 20, 2024', time: '5:00 PM CET', attendees: 30 }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [likedItems, setLikedItems] = useState<string[]>([]);

  // Load liked items from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("hub-liked-items");
    if (stored) setLikedItems(JSON.parse(stored));
  }, []);

  // Save likes to localStorage when changed
  useEffect(() => {
    localStorage.setItem("hub-liked-items", JSON.stringify(likedItems));
  }, [likedItems]);

  // Helper: is this item liked?
  function isLiked(id: number, type: string) {
    return likedItems.includes(`${type}-${id}`);
  }

  // Phone number detection regex (simple, international & local)
  function containsPhoneNumber(text: string): boolean {
    // Match sequences of 8-15 digits, allowing spaces, dashes or start with +, ignore year ranges etc.
    return /(?:\+?\d[\d .-]{7,14})/.test(text);
  }

  // Show alert and block if content has phone number
  function blockIfPhone(content: string): boolean {
    if (containsPhoneNumber(content)) {
      toast("Sharing personal contact info is not allowed.", {
        position: "top-center",
      });
      return true;
    }
    return false;
  }

  // Update handleLike to limit to once per item per person
  const handleLike = (itemId: number, type: "post" | "reel" | "poll" | "blog") => {
    const likeKey = `${type}-${itemId}`;
    if (isLiked(itemId, type)) {
      toast("You may only like this once.", {
        position: "top-center",
      });
      return;
    }
    setLikedItems([...likedItems, likeKey]);
    
    if (type === 'post' || type === 'reel' || type === 'poll') {
      setPosts(posts.map(item =>
        item.id === itemId && item.type === type
          ? { ...item, likes: item.likes + 1 }
          : item
      ));
    } else if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId ? { ...blog, likes: blog.likes + 1 } : blog
      ));
    }
  };

  // Handle edit functionality with proper implementation
  const handleEdit = (itemId: number, type: "post" | "reel" | "poll" | "blog") => {
    if (type === 'post' || type === 'reel' || type === 'poll') {
      const item = posts.find(p => p.id === itemId && p.type === type);
      if (item && item.author === 'You') {
        let currentContent = '';
        if (item.type === 'post') currentContent = item.content;
        else if (item.type === 'reel') currentContent = item.caption;
        else if (item.type === 'poll') currentContent = item.question;
        
        const newContent = prompt('Edit your content:', currentContent);
        
        if (newContent && newContent.trim() && newContent !== currentContent) {
          if (blockIfPhone(newContent)) return;
          
          setPosts(posts.map(p => 
            p.id === itemId && p.type === type
              ? { 
                  ...p, 
                  ...(p.type === 'post' && { content: newContent }),
                  ...(p.type === 'reel' && { caption: newContent }),
                  ...(p.type === 'poll' && { question: newContent })
                }
              : p
          ));
          toast("Content updated successfully!", {
            position: "top-center",
          });
        }
      } else {
        toast("You can only edit your own posts.", {
          position: "top-center",
        });
      }
    } else if (type === 'blog') {
      const blog = blogs.find(b => b.id === itemId);
      if (blog && blog.author === 'You') {
        const newTitle = prompt('Edit blog title:', blog.title);
        if (newTitle && newTitle.trim()) {
          const newContent = prompt('Edit blog content:', blog.content);
          if (newContent && newContent.trim()) {
            if (blockIfPhone(newContent)) return;
            
            setBlogs(blogs.map(b =>
              b.id === itemId ? { ...b, title: newTitle, content: newContent } : b
            ));
            toast("Blog updated successfully!", {
              position: "top-center",
            });
          }
        }
      } else {
        toast("You can only edit your own blogs.", {
          position: "top-center",
        });
      }
    }
  };

  // Handle delete functionality with proper implementation
  const handleDelete = (itemId: number, type: "post" | "reel" | "poll" | "blog") => {
    if (type === 'post' || type === 'reel' || type === 'poll') {
      const item = posts.find(p => p.id === itemId && p.type === type);
      if (item && item.author === 'You') {
        if (confirm('Are you sure you want to delete this ' + type + '?')) {
          setPosts(posts.filter(p => !(p.id === itemId && p.type === type)));
          toast("Content deleted successfully!", {
            position: "top-center",
          });
        }
      } else {
        toast("You can only delete your own posts.", {
          position: "top-center",
        });
      }
    } else if (type === 'blog') {
      const blog = blogs.find(b => b.id === itemId);
      if (blog && blog.author === 'You') {
        if (confirm('Are you sure you want to delete this blog?')) {
          setBlogs(blogs.filter(b => b.id !== itemId));
          toast("Blog deleted successfully!", {
            position: "top-center",
          });
        }
      } else {
        toast("You can only delete your own blogs.", {
          position: "top-center",
        });
      }
    }
  };

  // Handle edit comment functionality
  const handleEditComment = (postId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => {
    if (type === 'post' || type === 'reel' || type === 'poll') {
      const post = posts.find(p => p.id === postId && p.type === type);
      const comment = post?.comments.find(c => c.id === commentId);
      
      if (comment && comment.author === 'You') {
        const newContent = prompt('Edit your comment:', comment.content);
        if (newContent && newContent.trim() && newContent !== comment.content) {
          if (blockIfPhone(newContent)) return;
          
          setPosts(posts.map(p =>
            p.id === postId && p.type === type
              ? {
                  ...p,
                  comments: p.comments.map(c =>
                    c.id === commentId ? { ...c, content: newContent } : c
                  )
                }
              : p
          ));
          toast("Comment updated successfully!", {
            position: "top-center",
          });
        }
      } else {
        toast("You can only edit your own comments.", {
          position: "top-center",
        });
      }
    } else if (type === 'blog') {
      const blog = blogs.find(b => b.id === postId);
      const comment = blog?.comments.find(c => c.id === commentId);
      
      if (comment && comment.author === 'You') {
        const newContent = prompt('Edit your comment:', comment.content);
        if (newContent && newContent.trim() && newContent !== comment.content) {
          if (blockIfPhone(newContent)) return;
          
          setBlogs(blogs.map(b =>
            b.id === postId
              ? {
                  ...b,
                  comments: b.comments.map(c =>
                    c.id === commentId ? { ...c, content: newContent } : c
                  )
                }
              : b
          ));
          toast("Comment updated successfully!", {
            position: "top-center",
          });
        }
      } else {
        toast("You can only edit your own comments.", {
          position: "top-center",
        });
      }
    }
  };

  // Handle delete comment functionality
  const handleDeleteComment = (postId: number, commentId: number, type: "post" | "reel" | "poll" | "blog") => {
    if (type === 'post' || type === 'reel' || type === 'poll') {
      const post = posts.find(p => p.id === postId && p.type === type);
      const comment = post?.comments.find(c => c.id === commentId);
      
      if (comment && comment.author === 'You') {
        if (confirm('Are you sure you want to delete this comment?')) {
          setPosts(posts.map(p =>
            p.id === postId && p.type === type
              ? {
                  ...p,
                  comments: p.comments.filter(c => c.id !== commentId)
                }
              : p
          ));
          toast("Comment deleted successfully!", {
            position: "top-center",
          });
        }
      } else {
        toast("You can only delete your own comments.", {
          position: "top-center",
        });
      }
    } else if (type === 'blog') {
      const blog = blogs.find(b => b.id === postId);
      const comment = blog?.comments.find(c => c.id === commentId);
      
      if (comment && comment.author === 'You') {
        if (confirm('Are you sure you want to delete this comment?')) {
          setBlogs(blogs.map(b =>
            b.id === postId
              ? {
                  ...b,
                  comments: b.comments.filter(c => c.id !== commentId)
                }
              : b
          ));
          toast("Comment deleted successfully!", {
            position: "top-center",
          });
        }
      } else {
        toast("You can only delete your own comments.", {
          position: "top-center",
        });
      }
    }
  };

  // Update handleComment with phone detection
  const handleComment = (itemId: number, type: "post" | "reel" | "poll" | "blog") => {
    const commentText = newComment[`${type}-${itemId}`] || '';
    if (!commentText) return;
    if (blockIfPhone(commentText)) return;
    const newCommentObj: QAComment = {
      id: Date.now(),
      author: 'You',
      content: commentText,
      likes: 0,
      replies: []
    };
    if (type === 'post' || type === 'reel' || type === 'poll') {
      setPosts(posts.map(item =>
        item.id === itemId && item.type === type
          ? { ...item, comments: [...item.comments, newCommentObj] }
          : item
      ));
    } else if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId
          ? { ...blog, comments: [...blog.comments, newCommentObj] }
          : blog
      ));
    }
    setNewComment({ ...newComment, [`${type}-${itemId}`]: '' });
  };

  // Update handleReply for phone check
  const handleReply = (
    itemId: number,
    commentId: number,
    type: "post" | "reel" | "poll" | "blog"
  ) => {
    const replyText = newComment[`reply-${type}-${itemId}-${commentId}`] || '';
    if (!replyText) return;
    if (blockIfPhone(replyText)) return;
    const newReply: QAReply = {
      id: Date.now(),
      author: 'You',
      content: replyText,
      likes: 0
    };
    if (type === 'post' || type === 'reel' || type === 'poll') {
      setPosts(posts.map(post =>
        post.id === itemId && post.type === type
          ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, replies: [...comment.replies, newReply] }
                : comment
            )
          }
          : post
      ));
    } else if (type === 'blog') {
      setBlogs(blogs.map(blog =>
        blog.id === itemId
          ? {
            ...blog,
            comments: blog.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, replies: [...comment.replies, newReply] }
                : comment
            )
          }
          : blog
      ));
    }
    setNewComment({ ...newComment, [`reply-${type}-${itemId}-${commentId}`]: '' });
  };

  // Restrict phone sharing on post/blog/reel/poll creation
  const handlePublishPost = () => {
    if (!newPost) return;
    if (blockIfPhone(newPost)) return;
    const newPostObj: QAPost = {
      id: Date.now(),
      type: 'post',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: [],
      category: categoryFilter === "All" ? "General" : categoryFilter
    };
    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setActiveTab('qa');
  };

  const handleReelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) setNewReel(URL.createObjectURL(file));
  };

  const handlePublishReel = () => {
    if (!newReel || !newReelCaption) return;
    if (blockIfPhone(newReelCaption)) return;
    const newReelObj: Reel = {
      id: Date.now(),
      type: 'reel',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      videoUrl: newReel,
      caption: newReelCaption,
      likes: 0,
      comments: [],
      category: 'Travel'
    };
    setPosts([newReelObj, ...posts]);
    setNewReel(null);
    setNewReelCaption('');
    setActiveTab('reels');
  };

  const handlePublishBlog = () => {
    if (!blogTitle || !blogContent) return;
    if (blockIfPhone(blogContent)) return;
    const newBlog = {
      id: Date.now(),
      author: 'You',
      title: blogTitle,
      time: 'Just now',
      content: blogContent,
      likes: 0,
      comments: []
    };
    setBlogs([newBlog, ...blogs]);
    setBlogTitle('');
    setBlogContent('');
    setActiveTab('blogs');
  };

  const addPollOption = () => setPollOptions([...pollOptions, '']);
  const updatePollOption = (index: number, value: string) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handlePublishPoll = () => {
    if (!pollQuestion || pollOptions.some(opt => !opt)) return;
    const newPoll: Poll = {
      id: Date.now(),
      type: 'poll',
      author: 'You',
      avatar: '🧑‍🎓',
      time: 'Just now',
      question: pollQuestion,
      options: pollOptions.map(opt => ({ text: opt, votes: 0 })),
      likes: 0,
      comments: [],
      category: 'Poll'
    };
    setPosts([newPoll, ...posts]);
    setPollQuestion('');
    setPollOptions(['', '']);
    setActiveTab('polls');
  };

  const handleVotePoll = (pollId: number, optionIndex: number) => {
    setPosts(posts.map(post =>
      post.type === 'poll' && post.id === pollId
        ? {
          ...post,
          options: post.options.map((opt, idx) =>
            idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
          )
        }
        : post
    ));
  };

  // For search and filter: filter posts per type safely
  function searchQAPosts(posts: QAPost[]): QAPost[] {
    let result = posts;
    if (categoryFilter !== "All") {
      result = result.filter(p => p.category === categoryFilter);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(p =>
        p.content.toLowerCase().includes(term)
      );
    }
    return result;
  }

  function searchReels(posts: Reel[]): Reel[] {
    let result = posts;
    if (categoryFilter !== "All") {
      result = result.filter(p => p.category === categoryFilter);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(p =>
        p.caption.toLowerCase().includes(term)
      );
    }
    return result;
  }

  function searchPolls(posts: Poll[]): Poll[] {
    let result = posts;
    if (categoryFilter !== "All") {
      result = result.filter(p => categoryFilter === "Poll" || p.category === categoryFilter);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(p =>
        p.question.toLowerCase().includes(term)
      );
    }
    return result;
  }

  // Fix: Annotate function to return Blog[] type
  function searchBlogs(blogsArr: Blog[]): Blog[] {
    let result = blogsArr;
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(term) ||
        b.content.toLowerCase().includes(term)
      );
    }
    return result;
  }

  // Content-typed datasets for tabs
  const qaPosts = searchQAPosts(posts.filter((p): p is QAPost => p.type === "post"));
  const reels = searchReels(posts.filter((p): p is Reel => p.type === "reel"));
  const polls = searchPolls(posts.filter((p): p is Poll => p.type === "poll"));
  const filteredBlogs = searchBlogs(blogs);

  // Community stats (use all posts for stats, not just filtered)
  const activeMembers = 1247;
  const postsThisWeek = posts.filter(p => p.time === 'Just now').length + 89;
  const questionsAnswered = posts.reduce((acc, post) => acc + post.comments.length, 0) + 156;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Users className="h-8 w-8 mr-3 text-purple-600" />
          Community Hub
        </h1>
        <p className="text-lg text-gray-600">
          Connect with fellow students, share experiences, and get support
        </p>
        {/* Search and Filter bar */}
        <HubSearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={CATEGORIES}
        />
        <HubTabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'qa' && (
            <QATab
              qaPosts={qaPosts}
              newPost={newPost}
              onNewPostChange={setNewPost}
              onPublishPost={handlePublishPost}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
              newComment={newComment}
              setNewComment={setNewComment}
              onComment={handleComment}
              onReply={handleReply}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          )}
          {activeTab === 'blogs' && (
            <BlogsTab
              blogTitle={blogTitle}
              blogContent={blogContent}
              onChangeTitle={setBlogTitle}
              onChangeContent={setBlogContent}
              onPublish={handlePublishBlog}
              blogs={filteredBlogs}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
              newComment={newComment}
              setNewComment={setNewComment}
              onComment={handleComment}
              onReply={handleReply}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          )}
          {activeTab === 'reels' && (
            <ReelsTab
              reels={reels}
              newReel={newReel}
              newReelCaption={newReelCaption}
              onReelUpload={handleReelUpload}
              onChangeCaption={setNewReelCaption}
              onPublish={handlePublishReel}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
              newComment={newComment}
              setNewComment={setNewComment}
              onComment={handleComment}
              onReply={handleReply}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          )}
          {activeTab === 'polls' && (
            <PollsTab
              polls={polls}
              pollQuestion={pollQuestion}
              pollOptions={pollOptions}
              onChangeQuestion={setPollQuestion}
              onUpdateOption={updatePollOption}
              onAddOption={addPollOption}
              onPublish={handlePublishPoll}
              onVote={handleVotePoll}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
              newComment={newComment}
              setNewComment={setNewComment}
              onComment={handleComment}
              onReply={handleReply}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
            />
          )}
        </div>

        <div className="space-y-6">
          <div>
            <HubNoticeAlert />
          </div>
          <div>
            <HubTripPlanCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubPage;
