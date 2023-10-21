import "./Workspace.css";
import Slide from "../Slide/Slide.tsx";
import { Slide as TSlide } from "../../types/types.ts";

type WorkspaceProps = {
  slide: TSlide | null;
};

function Workspace({ slide }: WorkspaceProps) {
  return (
    <div className="workspace">
      <div className="workspace__new-slide">
        Нажмите, чтобы добавить новый слайд
      </div>
      {slide && <Slide slide={slide} className="workspace__slide" />}
    </div>
  );
}

export default Workspace;
