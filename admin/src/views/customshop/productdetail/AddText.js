import React, { useState } from "react";
import { EditorState } from "draft-js";
import "@styles/react/libs/editor/editor.scss";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import FaqModal from "./FaqModal";

const AddText = ({ onTextAdd }) => {
  const [desc, setDesc] = useState(EditorState.createEmpty());

  const handleApplyText = () => {
    // Extract plain text from editor state
    const text = desc.getCurrentContent().getPlainText();

    // Extract text style
    const currentContent = desc.getCurrentContent();
    const firstBlock = currentContent.getFirstBlock();
    const fontSize = firstBlock.getData().get("fontSize");
    const color = firstBlock.getData().get("color");

    const style = {
      fontSize: fontSize,
      color: color
    };

    // Pass text and style to the parent component
    onTextAdd(text, style);
  };

  return (
    <div>
      <h4 className="mt-1">
        Custom Text
        <span style={{ float: "right" }}>
          <FaqModal />
        </span>
      </h4>
      <div className="mt-2">
        <Editor
          editorState={desc}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(data) => setDesc(data)}
        />
      </div>
      <button className="btn btn-success mt-1" onClick={handleApplyText}>
        Apply
      </button>
    </div>
  );
};

export default AddText;
