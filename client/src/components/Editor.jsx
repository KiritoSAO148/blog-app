import { memo } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const Editor = ({ content, setContent }) => {
  const handleChangeInput = (e) => {
    setContent(e);
  };

  return (
    <SunEditor
      className="rounded-md bg-transparent"
      placeholder="Write something..."
      autoFocus={true}
      onChange={handleChangeInput}
      width="100%"
      height="500"
      defaultValue={content}
      setOptions={{
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["removeFormat"],
          ["fontColor", "hiliteColor"],
          ["indent", "outdent"],
          ["align", "horizontalRule", "list", "table"],
          ["link", "image", "video"],
          ["fullScreen", "showBlocks", "codeView"],
        ],
      }}
    />
  );
};

export default memo(Editor);
