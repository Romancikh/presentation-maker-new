import "./Editor.css";
import { Presentation } from "../../types/types.ts";
import SlideBar from "../SlideBar/SlideBar.tsx";
import Workspace from "../Workspace/Workspace.tsx";

type EditorProps = {
  presentation: Presentation;
};

function Editor({ presentation }: EditorProps) {
  return (
    <div className="editor">
      <SlideBar slides={presentation.slides} />
      <Workspace slide={presentation.currentSlide} />
    </div>
  );
}

export default Editor;