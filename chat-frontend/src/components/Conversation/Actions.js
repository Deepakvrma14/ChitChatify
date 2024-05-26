import { useTheme } from "@mui/material/styles";
import { Camera, File, Image, Sticker, User } from "phosphor-react";

const UseActions = () => {
  const theme  = useTheme();

  const Actions = [
    {
      color: theme.palette.mode === "light" ? "#ff4a09" : "#c5721f",
      icon: <Image size={24} />,
      y: 102,
      title: "Photo/Video",
    },
    {
      color: theme.palette.mode === "light" ? "#ff6b2d" : "#d38233",
      icon: <Sticker size={24} />,
      y: 172,
      title: "Stickers",
    },
    {
      color: theme.palette.mode === "light" ? "#ff8c51" : "#e19247",
      icon: <Camera size={24} />,
      y: 242,
      title: "Image",
    },
    {
      color: theme.palette.mode === "light" ? "#ffa275" : "#efa25b",
      icon: <File size={24} />,
      y: 312,
      title: "Document",
    },
    {
      color: theme.palette.mode === "light" ? "#ffb899" : "#fcb26f",
      icon: <User size={24} />,
      y: 382,
      title: "Contact",
    },
  ];

  return Actions;
};

export default UseActions;