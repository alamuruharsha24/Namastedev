import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import courseData from '../data/courseData';
import { ShoppingCart, ThumbsUp, ThumbsDown, Share2, Bookmark, Code2, ChevronDown, ChevronUp } from 'lucide-react';

const akshaySainiImage = 'https://avatars.githubusercontent.com/u/54212428?v=4';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<{ sectionKey: string; lessonIndex: number }>({
    sectionKey: '',
    lessonIndex: 0
  });
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(12000);
  const [dislikes, setDislikes] = useState(500);
  const [comments, setComments] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const course = courseData[courseId as keyof typeof courseData];
  if (!course) return <div>Course not found</div>;

  const sections = Object.entries(course).map(([sectionTitle, lessons]) => ({
    key: sectionTitle.replace(/\s+/g, '-').toLowerCase(),
    title: sectionTitle,
    lessons
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (sections.length > 0 && !expandedSections.length) {
      setExpandedSections([sections[0].key]);
      setSelectedLesson({
        sectionKey: sections[0].key,
        lessonIndex: 0
      });
    }
  }, [courseId]);

  const currentLesson = sections
    .find(s => s.key === selectedLesson.sectionKey)
    ?.lessons[selectedLesson.lessonIndex];

  const generateVideoUrl = (videoUrl: string) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      const videoId = videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop();
      return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
    }
    return videoUrl;
  };

  const videoUrl = currentLesson ? generateVideoUrl(currentLesson.video) : '';

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments-${courseId}`);
    if (storedComments) setComments(JSON.parse(storedComments));
  }, [courseId]);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments-${courseId}`, JSON.stringify(comments));
    }
  }, [comments, courseId]);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionKey)
        ? prev.filter(key => key !== sectionKey)
        : [...prev, sectionKey]
    );
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = {
      id: Date.now(),
      comment,
      replies: [],
      timestamp: new Date().toLocaleString(),
    };
    setComments([...comments, newComment]);
    setComment('');
  };

  const handleReplySubmit = (e: React.FormEvent, commentId: number) => {
    e.preventDefault();
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, { reply: replyText }] }
        : comment
    );
    setComments(updatedComments);
    setReplyText('');
    setReplyingTo(null);
  };

  const handleRemoveComment = (commentId: number) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleRemoveReply = (commentId: number, replyIndex: number) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: comment.replies.filter((_, i) => i !== replyIndex) }
        : comment
    );
    setComments(updatedComments);
  };

  const getCoursePrice = () => {
    switch (courseId) {
      case 'react': return 800;
      case 'node': return 1000;
      case 'system': return 1200;
      case 'javascript': return 0;
      default: return 0;
    }
  };

  if (!currentLesson) return null;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-gray-300">
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Namaste Dev
            </span>
          </Link>
          <div className="flex space-x-8 text-gray-300">
            <Link to="/courses" className="hover:text-purple-400 transition-colors">Courses</Link>
            <Link to="/signup" className="hover:text-purple-400 transition-colors">Sign Up</Link>
            <Link to="/login" className="hover:text-purple-400 transition-colors">Login</Link>
            <Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-24 pt-32">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[70%]">
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-200">{currentLesson.title}</h1>
              <p className="text-gray-400 mt-2">1.2M views • 2 days ago</p>
            </div>

            <div className="flex items-center space-x-6 my-6">
              <button onClick={() => setLikes(l => l + 1)} className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <ThumbsUp className="w-6 h-6" /><span>{likes}</span>
              </button>
              <button onClick={() => setDislikes(d => d + 1)} className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <ThumbsDown className="w-6 h-6" /><span>{dislikes}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <Share2 className="w-6 h-6" /><span>Share</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors">
                <Bookmark className="w-6 h-6" /><span>Save</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-4">
                <img src={akshaySainiImage} alt="Akshay Saini" className="w-14 h-14 rounded-full border-2 border-purple-500" />
                <div>
                  <p className="text-lg font-semibold text-gray-200">Akshay Saini</p>
                  <p className="text-gray-400 text-sm">1M+ Enrolled</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/checkout/${courseId}`)}
                className={`px-6 py-3 rounded-lg text-white transition-colors flex items-center ${
                  courseId === 'javascript' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {courseId === 'javascript' ? 'Enroll Now - Free' : `Enroll Now - ₹${getCoursePrice()}`}
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-200 mb-6">Comments</h2>
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-colors"
                  placeholder="Write a comment..."
                  rows={4}
                ></textarea>
                <button
                  type="submit"
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Post Comment
                </button>
              </form>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                    <p className="text-gray-300">{comment.comment}</p>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleRemoveComment(comment.id)}
                        className="text-red-400 hover:text-red-500 text-sm transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setReplyingTo(comment.id)}
                        className="text-purple-400 hover:text-purple-500 text-sm transition-colors"
                      >
                        Reply
                      </button>
                    </div>

                    <div className="mt-4 ml-6 space-y-4">
                      {comment.replies.map((reply, index) => (
                        <div key={index} className="bg-gray-900/30 p-3 rounded-lg">
                          <p className="text-gray-400 text-sm">{reply.reply}</p>
                          <button
                            onClick={() => handleRemoveReply(comment.id, index)}
                            className="text-red-400 hover:text-red-500 text-xs mt-2"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                      {replyingTo === comment.id && (
                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-4">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full p-2 bg-gray-900/20 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-sm"
                            placeholder="Write a reply..."
                            rows={2}
                          ></textarea>
                          <div className="flex gap-3 mt-2">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
                            >
                              Post Reply
                            </button>
                            <button
                              type="button"
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-[30%]">
            <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hidden">
              <h2 className="text-2xl font-bold text-gray-200 mb-6 px-4">Course Content</h2>
              <div className="space-y-2 pr-2">
                {sections.map(section => (
                  <div key={section.key} className="bg-gray-800 rounded-xl border border-gray-700">
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="w-full p-4 text-left rounded-xl transition-all flex justify-between items-center hover:bg-gray-700/50"
                    >
                      <span className="text-gray-200 font-medium">{section.title}</span>
                      <span className="transition-transform duration-200">
                        {expandedSections.includes(section.key) ? (
                          <ChevronUp className="w-5 h-5 text-purple-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-purple-400" />
                        )}
                      </span>
                    </button>

                    <div
                      className="transition-all duration-300 overflow-hidden"
                      style={{
                        maxHeight: expandedSections.includes(section.key) ? '1000px' : '0px',
                        opacity: expandedSections.includes(section.key) ? 1 : 0
                      }}
                    >
                      <div className="space-y-2 px-2 pb-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson({ sectionKey: section.key, lessonIndex })}
                            className={`w-full p-4 text-left rounded-xl transition-all ${
                              selectedLesson.sectionKey === section.key && 
                              selectedLesson.lessonIndex === lessonIndex
                                ? 'bg-purple-500/20 border border-purple-500/50'
                                : 'bg-gray-800 hover:bg-gray-700/50 border border-gray-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={
                                selectedLesson.sectionKey === section.key && 
                                selectedLesson.lessonIndex === lessonIndex
                                  ? 'text-purple-400'
                                  : 'text-gray-300'
                              }>
                                {lesson.title}
                              </span>
                              {selectedLesson.sectionKey === section.key && 
                              selectedLesson.lessonIndex === lessonIndex && (
                                <span className="text-purple-400 text-sm">Playing</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .scrollbar-hidden::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hidden {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .transition-all {
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          .duration-300 {
            transition-duration: 300ms;
          }
        `}
      </style>
    </div>
  );
};

export default CourseDetails;