import { useDispatch, useSelector } from "react-redux";
import { Box, SpeedDial } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import MainChat from "./MainChat";
import ZoomInFromBottomRight from "./ZoomInFromBottomRight ";
import { setPopup } from "../../redux/messageSlice";

const PopupMessage = () => {
  const popup = useSelector((state) => state.messages.popup);
  const dispatch = useDispatch();

  const toggleMainChat = () => {
    dispatch(setPopup(!popup));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        display: "flex",
        gap: 3,
        zIndex: 1000,
      }}
    >
      <ZoomInFromBottomRight isOpen={popup}>
        <MainChat />
      </ZoomInFromBottomRight>
      <SpeedDial
        ariaLabel="Popup message"
        color="#0694A2"
        sx={{}}
        icon={<MessageIcon />}
        FabProps={{
          sx: {
            bgcolor: "#0694a9",
            ":hover": {
              bgcolor: "#0694d9",
            },
          },
        }}
        onClick={toggleMainChat}
      ></SpeedDial>
    </Box>
  );
};

export default PopupMessage;
