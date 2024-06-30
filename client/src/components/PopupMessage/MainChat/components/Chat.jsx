import { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

import MessageItem from "./MessageItem";
import { dataMessage } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { setAiChat } from "../../../../redux/messageSlice";
import { messageApi } from "../../../../utils/api/messageApi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHiddenSuggess, setIsHiddenSuggess] = useState(false);
  // const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const {
    user: data,
    userChat,
    aiChat,
  } = useSelector((state) => state.messages);

  useEffect(() => {
    const chatContainer = messagesEndRef.current;
    if (chatContainer) {
      const isUserAtBottom =
        chatContainer.scrollHeight - chatContainer.clientHeight <=
        chatContainer.scrollTop + 1;

      if (isUserAtBottom) {
        chatContainer.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [userChat, isLoading]);

  const handleSend = async () => {
    if (!message) return;
    setIsLoading(true);
    setMessage("");
    dispatch(
      setAiChat({
        fromSelf: true,
        message: message,
      })
    );
    try {
      const result = await messageApi.ask({ message });
      setMessageData((prev) => [result, ...prev]);
      dispatch(setAiChat(result));
    } catch (error) {
      dispatch(
        setAiChat({
          fromSelf: false,
          message: "Đã sảy ra lỗi",
        })
      );
    }
    setIsLoading(false);
  };

  return (
    <Box pl={2} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
        >
          <Typography>to: </Typography>
          <Typography fontWeight={600}>AI</Typography>
        </Box>
        <Divider variant="middle" />
      </Box>
      <Box sx={{ flex: 1, padding: 3, overflow: "auto", height: "80%" }}>
        {aiChat?.map((chat, index) => (
          <MessageItem key={index} {...chat} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      {isHiddenSuggess && (
        <button
          className="flex justify-center p-1"
          onClick={() => setIsHiddenSuggess(false)}
        >
          <BsEyeFill />
        </button>
      )}
      <Box
        display={isHiddenSuggess ? "none" : "flex"}
        flexWrap={"wrap"}
        gap={1}
        sx={{ position: "relative" }}
      >
        <button
          className="absolute right-0"
          onClick={() => setIsHiddenSuggess(true)}
        >
          <AiFillCloseCircle color="orange" />
        </button>
        {dataMessage?.map((mess, i) => (
          <Typography
            onClick={() => setMessage(mess)}
            key={i}
            sx={{
              px: 1,
              fontSize: 12,
              width: "max-content",
              borderRadius: "50px",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "skyblue",
              cursor: "pointer",
              fontStyle: "italic",
            }}
          >
            {mess}
          </Typography>
        ))}
      </Box>

      <Box sx={{ mt: "auto", width: "100%", display: "flex", marginTop: 2 }}>
        <TextField
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          value={message}
          label="Đặt câu hỏi..."
          variant="standard"
          sx={{
            input: { color: "#0694A2", fontWeight: 600, px: 2 },
            label: { color: "#0694A2" },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <LoadingButton
          onClick={handleSend}
          // loading={isLoading}
          color="error"
          disabled={!message}
          sx={{ color: "white" }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <SendIcon color="white" sx={{ color: "white" }} />
          )}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Chat;
