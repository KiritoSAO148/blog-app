import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { messageApi } from "../utils/api/messageApi";
import { CircularProgress } from "@mui/material";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [postPublishing, setPostPublishing] = useState(false);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAIGenarating, setIsAIGenarating] = useState(false);
  const [keyForEditor, setKeyForEditor] = useState(0);

  useEffect(() => {
    setKeyForEditor((prevKey) => prevKey + 1);
  }, [content]);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }

      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostPublishing(true);

    try {
      formData.content = content;
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        setPostPublishing(false);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setPostPublishing(false);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
      setPostPublishing(false);
    }
  };

  const handleAIGenerator = async () => {
    if (!formData.title) return toast.error("Please type a title");
    if (!formData.category) return toast.error("Please select a category");
    setIsAIGenarating(true);
    try {
      const data = await messageApi.aiGene(formData.title, formData.category);
      setContent(data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsAIGenarating(false);
    }
  };

  console.log(content);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold"></h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        <Divider
          style={{ color: "white", borderColor: "white" }}
          sx={{
            ":before": {
              borderColor: "white",
            },
            ":after": {
              borderColor: "white",
            },
          }}
        >
          <Chip
            style={{ color: "white", background: "gray" }}
            label="Or"
            size="small"
          />
        </Divider>
        <div className="gap-2">
          <TextInput
            type="text"
            placeholder="Image url"
            value={imageUrl}
            onChange={(e) => e.target.value && setImageUrl(e.target.value)}
          />
          <Button
            className="w-full mt-4"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                image: imageUrl,
              }))
            }
          >
            Submit
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        {/* <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          modules={modules}
          formats={formats}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        /> */}

        <Editor key={keyForEditor} content={content} setContent={setContent} />
        {!isAIGenarating ? (
          <Button
            variant="outlined"
            color="info"
            onClick={handleAIGenerator}
            sx={{ color: "skyblue", fontWeight: "bold" }}
          >
            Use AI to generator
          </Button>
        ) : (
          <div className="flex justify-center">
            <CircularProgress size={20} />
          </div>
        )}

        <Button type="submit" gradientDuoTone="purpleToPink">
          {postPublishing ? "Publishing..." : "Publish"}
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
