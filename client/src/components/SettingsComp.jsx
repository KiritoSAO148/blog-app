import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { customSystemApi } from "../utils/api/customSystemApi";
import toast from "react-hot-toast";

const SettingsComp = () => {
  const [openaiKey, setOpenaiKey] = useState(null);

  useEffect(() => {
    const getOpenaiKey = async () => {
      const { key } = await customSystemApi.getOpenaiKey();
      setOpenaiKey(key);
    };
    getOpenaiKey();
  }, []);

  const handleUpdateOpenaiKey = async () => {
    try {
      const { key } = await toast.promise(
        customSystemApi.updateOpenaiKey({ openaiKey }),
        {
          loading: "Đang cập nhật...",
          success: "Cập nhật thành công",
          error: "Cập nhật thất bại",
        }
      );
      setOpenaiKey(key?.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <TextField
        label="OpenAI key"
        variant="filled"
        onChange={(e) => setOpenaiKey(e.target.value)}
        value={openaiKey}
        type="password"
        sx={{
          width: 500,
          input: {
            color: "gray",
            fontStyle: "italic",
            fontSize: "1.2rem",
            fontWeight: "bold",
            mt: 1,
          },
          border: {
            color: "white",
          },
          label: {
            color: "white",
          },
        }}
      />
      <Button
        sx={{ width: 500 }}
        onClick={handleUpdateOpenaiKey}
        disabled={!openaiKey}
      >
        Update
      </Button>
    </div>
  );
};

export default SettingsComp;
