import React from 'react';
import { useParams } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { Lesson } from '../types';

export default function CourseDetails() {
  const { courseId } = useParams();
  const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(null);
  const [comment, setComment] = React.useState('');

  const course = courseData[courseId as keyof typeof courseData];
  const lessons = course ? Object.values(course)[0] : [];

  React.useEffect(() => {
    if (lessons.length > 0 && !selectedLesson) {
      setSelectedLesson(lessons[0]);
    }
  }, [lessons]);

  if (!course || !selectedLesson) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setComment('');
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Main Content - 70% */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Video Player */}
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={selectedLesson.video}
                  title={selectedLesson.title}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Lesson Info */}
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">{selectedLesson.title}</h1>
                <p className="text-gray-600 mb-6">{selectedLesson.description}</p>

                {/* Topics */}
                {selectedLesson.topics && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Topics Covered:</h2>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedLesson.topics.map((topic, index) => (
                        <li key={index} className="text-gray-600">{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Discussion Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Discussion</h2>
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ask a question or share your thoughts..."
                      rows={3}
                    ></textarea>
                    <button
                      type="submit"
                      className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 30% */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Course Lessons</h2>
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedLesson.id === lesson.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <h3 className="font-medium">{lesson.title}</h3>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}