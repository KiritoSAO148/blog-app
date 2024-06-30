import { Avatar, Box, Paper, Typography } from "@mui/material";

const MessageItem = (props) => {
  const { message, fromSelf } = props;

  const reveicer = {
    avatar:
      "https://th.bing.com/th/id/OIG1.JIWesinTV3ZCn2g6QolX?w=173&h=173&c=6&r=0&o=5&pid=ImgGn",
    name: "AI",
  };

  const user = {
    avatar:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3e42140f-a25b-4231-abdd-5820e79331b1/dhib9ji-3f5919ba-f41d-4a54-9f38-e9a598476330.jpg/v1/fit/w_300,h_900,q_70,strp/reptile__by_vexat062_dhib9ji-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTY5NCIsInBhdGgiOiJcL2ZcLzNlNDIxNDBmLWEyNWItNDIzMS1hYmRkLTU4MjBlNzkzMzFiMVwvZGhpYjlqaS0zZjU5MTliYS1mNDFkLTRhNTQtOWYzOC1lOWE1OTg0NzYzMzAuanBnIiwid2lkdGgiOiI8PTE3MjkifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.0aJNa7_BnzoaKhb5qHD-VyIsOro_956quJWQnvy9EIs",
    name: "User",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: fromSelf ? "end" : "start",
        pb: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "max-content",
          background: !fromSelf ? "#334155" : "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            padding: 1,
            flexDirection: fromSelf ? "row-reverse" : "row",
          }}
        >
          <Avatar
            src={fromSelf ? user?.avatar : reveicer?.avatar}
            alt={"avatar"}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: fromSelf ? "end" : "start",
            }}
          >
            <Typography
              fontSize={18}
              fontWeight={600}
              sx={{
                color: !fromSelf ? "#A959DB" : "dark",
              }}
            >
              {fromSelf ? (user ? user?.name : "Khách") : reveicer?.name}
            </Typography>
            <Typography
              textAlign={"justify"}
              sx={{
                color: !fromSelf ? "#9261F7" : "dark",
              }}
            >
              {message}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default MessageItem;
