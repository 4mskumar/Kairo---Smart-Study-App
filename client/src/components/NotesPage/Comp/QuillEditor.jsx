import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // snow theme includes toolbar styling

const QuillEditor = () => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start typing your notes...",
        modules: {
          toolbar: [
            [{ size: [] }], // size dropdown
            ["bold", "italic", "underline", "strike"], // formatting
            [{ color: [] }, { background: [] }], // text & background color
            [{ script: "sub" }, { script: "super" }], // sub/super script
            [{ header: 1 }, { header: 2 }], // headers
            ["blockquote", "code-block"], // blocks
            [{ list: "ordered" }, { list: "bullet" }], // lists
            [{ indent: "-1" }, { indent: "+1" }], // indentation
            [{ align: [] }], // alignment
            ["link", "image"], // media
            ["clean"], // remove formatting
          ],
        },
      });
    }
  }, []);

  return (
    <div className="w-2/3 ml-14 mt-2 h-[92vh] ">
      <div ref={editorRef} style={{ background: "white" }} />
    </div>
  );
};

export default QuillEditor;
