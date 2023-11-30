import { File, Home, Users } from "react-feather";

export default [
  {
    id: "zone",
    title: "Zone",
    icon: <Home size={20} />,
    isAccess: true,
    navLink: "/zone",
  },
  {
    id: "post_office",
    title: "Head Post Office",
    icon: <Home size={20} />,
    isAccess: true,
    navLink: "/head_post_office",
  },
  {
    id: "post_office",
    title: "Post Office",
    icon: <Home size={20} />,
    isAccess: true,
    navLink: "/post_office",
  },
  {
    id: "type",
    title: "Type",
    icon: <File size={20} />,
    isAccess: true,
    navLink: "/type",
  },
  {
    id: "accounts",
    title: "Accounts",
    icon: <Users size={20} />,
    isAccess: true,
    navLink: "/user",
  },
];
