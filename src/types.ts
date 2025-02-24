export interface Lesson {
  id: string;
  title: string;
  description: string;
  topics?: string[];
  video: string;
  assignmentLink: string;
}

export interface CourseSection {
  [key: string]: Lesson[];
}

export interface CourseData {
  javascript: CourseSection;
  react: CourseSection;
  node: CourseSection;
  system: CourseSection;
}

export interface User {
  id: string;
  email: string;
  name: string;
  purchasedCourses: string[];
}