import React, { Fragment } from "react";
import Lesson from "./Lesson";

const sections = [
  {
    id: 1,
    title: "Getting Started",
    lessons: [
      {
        id: 1,
        title: "Data Binding",
        duration: "9:11",
      },
      {
        id: 2,
        title: "Actions",
        duration: "4:17",
      },
    ],
  },
  {
    id: 2,
    title: "A Basic Form With Validation",
    lessons: [
      {
        id: 3,
        title: "Lifecycle Hooks",
        duration: "4:43",
      },
      {
        id: 4,
        title: "Nesting",
        duration: "11:28",
      },
      {
        id: 5,
        title: "Events",
        duration: "9:44",
      },
    ],
  },
  {
    id: 3,
    title: "Form Notifications",
    lessons: [
      {
        id: 3,
        title: "Lifecycle Hooks",
        duration: "4:43",
      },
      {
        id: 4,
        title: "Nesting",
        duration: "11:28",
      },
      {
        id: 5,
        title: "Events",
        duration: "9:44",
      },
    ],
  },
];

// const list = [
//   {
//     id: 1,
//     title: "Data Binding",
//     duration: "9:11"
//   },
//   {
//     id: 2,
//     title: "Actions",
//     duration: "4:17"
//   },
//   {
//     id: 3,
//     title: "Lifecycle Hooks",
//     duration: "4:43"
//   },
//   {
//     id: 4,
//     title: "Nesting",
//     duration: "11:28"
//   },
//   {
//     id: 5,
//     title: "Events",
//     duration: "9:44"
//   }
// ];

// const List = () => (
//   <div class="container mx-auto p-4">
//     <h5 class="text-lg font-semibold text-blue-800">Getting Started</h5>
//     <ul class="list-none">
//       {list.map(item => (
//         <Lesson id={item.id} title={item.title} duration={item.duration} />
//       ))}
//     </ul>
//   </div>
// );

const List = () => {
  return (
    <Fragment>
      <div className="container mx-auto p-4">
        {sections.map((list) => (
          <div key={list.id}>
            <h5 className="text-lg font-semibold text-blue-800">
              {list.title}
            </h5>
            <ul className="list-none">
              {list.lessons.map((lesson) => (
                <Lesson
                  id={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                />
              ))}
            </ul>
            <div className="border-t pt-4" />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default List;
