import { Avatar, Box, Divider, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";

const ListItem = (data) => {
  const handleSelect = () => {};

  return (
    <Box sx={{ cursor: "pointer" }} onClick={handleSelect}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          paddingTop: 2,
          pr: 2,
        }}
      >
        <Avatar
          src={
            "https://th.bing.com/th/id/OIG1.JIWesinTV3ZCn2g6QolX?w=173&h=173&c=6&r=0&o=5&pid=ImgGn"
          }
        />
        <Box width={"100%"}>
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={600}>AI iAm</Typography>
            {data.seen && <Box component={"li"} sx={{ color: "green" }}></Box>}
            <Typography
              fontWeight={600}
              color={"#777"}
              fontSize={13}
              fontStyle={"italic"}
            >
              {data.time}
            </Typography>
          </Box>
          <Typography fontSize={14} color={!data.seen ? "#555" : "#000"}>
            Chating with AI
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" sx={{ pt: 1 }} />
    </Box>
  );
};

function List() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <ListIcon />
        <Typography fontWeight={600}>Danh sách</Typography>
      </Box>
      <Box sx={{ overflowY: "auto", height: "90%" }}>
        <ListItem />
      </Box>
    </Box>
  );
}

export default List;
