export interface CurriculumPlan {
    id: number;
    title: string;
    duration: string;
    lessions: string[];
    description: string;
}

// const curriculumPlan: CurriculumPlan[] = [
//   {
//     id: 1,
//     title: "Module 1: HTML & CSS cơ bản",
//     duration: "2 tuần",
//     description:
//       "Học các kiến thức nền tảng về HTML5 và CSS3, từ cú pháp cơ bản đến responsive design. Bạn sẽ nắm vững cách xây dựng layout hiện đại với Flexbox và Grid.",
//     lessons: [
//       "Semantic HTML và cấu trúc trang web",
//       "CSS Flexbox và Grid Layout",
//       "Responsive Design với Media Queries",
//       "CSS Variables và Custom Properties",
//     ],
//   },
//   {
//     id: 2,
//     title: "Module 2: JavaScript hiện đại",
//     duration: "3 tuần",
//     description:
//       "Khám phá JavaScript ES6+ với các tính năng mới nhất. Học cách làm việc với async/await, promises và các design patterns phổ biến trong JS hiện đại.",
//     lessons: ["ES6+ Syntax và Features", "Async/Await và Promises", "DOM Manipulation", "API Integration với Fetch"],
//   },
//   {
//     id: 3,
//     title: "Module 3: React & TypeScript",
//     duration: "4 tuần",
//     description:
//       "Làm chủ React library và TypeScript. Xây dựng ứng dụng web động với hooks, context API và type-safe code. Hiểu rõ component lifecycle và state management.",
//     lessons: [
//       "React Components và Hooks",
//       "State Management với Context API",
//       "TypeScript cơ bản đến nâng cao",
//       "React Router và Navigation",
//     ],
//   },
//   {
//     id: 4,
//     title: "Module 4: Next.js & Deployment",
//     duration: "3 tuần",
//     description:
//       "Học framework Next.js mạnh mẽ với App Router, Server Components và các tính năng tối ưu hóa. Triển khai ứng dụng lên production và tích hợp database.",
//     lessons: [
//       "Next.js App Router và Server Components",
//       "API Routes và Server Actions",
//       "Database Integration",
//       "Deploy lên Vercel",
//     ],
//   },
// ]

// export const getCurriculumData = () => curriculumPlan

// export const getPlanById = (id: number) => curriculumPlan.find((plan) => plan.id === id)