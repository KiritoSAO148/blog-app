import { useEffect, useState } from "react";
import "./styles.css";
import { messageApi } from "../../utils/api/messageApi";

const TrickNav = () => {
  const [position, setPosition] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const getText = async () => {
      if (text) return;
      try {
        const rs = await messageApi.getText("Mẹo để tạo post hay nhất");
        rs?.message && setText(rs.message);
      } catch (error) {
        console.log(error);
      }
    };
    getText();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) =>
        prevPosition <= -100 ? 0 : prevPosition - 1
      );
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (!text) return;

  return (
    <div
      style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%" }}
      className="py-1 transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow]  focus:outline-none bg-gradient-to-r from-purple-500 to-pink-500 text-white focus:ring-4 focus:ring-purple-200 enabled:hover:bg-gradient-to-l dark:focus:ring-purple-800"
    >
      <div
        style={{
          transform: `translateX(${position}%)`,
          color: "white",
          fontFamily: "cursive",
          fontStyle: "italic",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default TrickNav;
