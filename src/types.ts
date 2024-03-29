import { Theme } from "@material-ui/core";

export type Id = number;

// export interface BoardMember {
//   id: number;
//   username: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   avatar: Avatar | null;
// }

export interface Label {
  id: number;
  name: string;
  color: string;
  board: Id;
}

export interface NanoBoard {
  id: number;
  name: string;
  owner: Id;
}

interface Course {
  id: Id;
  name: string;
}

export interface EnrolledBoard {
  user: number;
  course: Course;
  createdBy: string;
}



export interface ICategory {
  id: number;
  title: string;
}

export interface Board {
  id: number;
  name: string;
  owner: Id;
  short_description: string;
  description: string;
  category: ICategory;
  outcome: string;
  thumbnail: string;
  video_url: string;
  is_published: boolean;
  price: number;
  // members: BoardMember[];
}

export interface IColumn {
  id: number;
  title: string;
  board: Id;
}

export type PriorityValue = "V" | "C" | "T";

export interface Priority {
  value: PriorityValue;
  label: "Video" | "Code" | "Text";
}

export interface ITask {
  id: Id;
  created: string;
  modified: string;
  title: string;
  description: string;
  labels: Id[];
  // assignees: Id[];
  video_url: string;
  recording: string;
  audio: string;
  audioblob: string;
  priority: PriorityValue;
}

export interface NewTask
  extends Omit<
    ITask,
    "id" | "created" | "modified" | "video_url" | "recording"
  > {
  column: Id;
}

export interface TasksByColumn {
  [key: string]: Id[];
}

export interface User {
  id: number;
  username: string;
  photo_url: string | null;
}

export interface UserDetail {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  avatar: Avatar | null;
  date_joined: string;
  is_guest: boolean;
}

export interface Avatar {
  id: number;
  photo: string;
  name: string;
}

export interface CurrentUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface WithTheme {
  theme: Theme;
}

export interface AuthSetup {
  ALLOW_GUEST_ACCESS: boolean;
}
