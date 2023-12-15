import {
  Image as TImage,
  Primitive as TPrimitive,
  Text as TText,
} from "../../../types/types";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import Image from "../Image/Image";
import Primitive from "../Primitive/Primitive";
import Text from "../Text/Text";
import classes from "./Block.module.css";
import useDragAndDrop from "../../../hooks/useDragAndDrop.ts";
import { PresentationContext } from "../../../contexts/presentation.tsx";
import { TonClickPresentation } from "../../SlideBar/SlideBar.tsx";

type BlockProps = (TPrimitive | TImage | TText) & {
  isWorkSpace: boolean;
};

function Block({
  id,
  position,
  size,
  rotation,
  type,
  data,
  isWorkSpace,
}: BlockProps) {
  const { presentation, setPresentation } = useContext(PresentationContext);
  const [modelPosition, setModelPosition] = useState(position);
  const [selectClass, setSelectClass] = useState("");

  const handleClick = () => {
    const newPresentation = { ...presentation };

    newPresentation.currentSlide?.objects.map((object) => {
      if (
        object.id === id &&
        !newPresentation.currentSlide?.selectObjects.includes(object)
      ) {
        newPresentation.currentSlide?.selectObjects.push(object);
        setSelectClass(classes.block__select);
      } else if (
        object.id === id &&
        newPresentation.currentSlide?.selectObjects.includes(object)
      ) {
        if (newPresentation.currentSlide !== null) {
          newPresentation.currentSlide.selectObjects =
            newPresentation.currentSlide.selectObjects.filter((object) => {
              object.id !== id;
              setSelectClass("");
            });
        }
      }
    });

    setPresentation(newPresentation);
  };

  useDragAndDrop(modelPosition, setModelPosition);

  const centerX = size.width / 2;
  const centerY = size.height / 2;

  const style: CSSProperties = {
    height: size.height,
    left: modelPosition.x,
    top: modelPosition.y,
    transform: `rotate(${rotation}deg)`,
    transformOrigin: `${centerX}px ${centerY}px`,
    width: size.width,
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const newPresentation = { ...presentation };
    newPresentation.currentSlide?.selectObjects.map((object) => {
      const enterKey = event.key;
      if (object.id === id && object.type === "text") {
        if (enterKey.length === 1) {
          object.data.text += enterKey;
        } else if (enterKey === "Enter") {
          object.data.text += "\n";
        } else if (enterKey === "Backspace") {
          object.data.text = object.data.text.slice(0, -1);
        }
        setPresentation(newPresentation);
      }
    });
  };

  useEffect(() => {
    if (type === "text" && isWorkSpace) {
      window.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [type]);

  return (
    <div
      onClick={handleClick}
      className={classes.block + " " + selectClass}
      style={style}
    >
      {type === "image" && <Image data={data} />}
      {type === "primitive" && <Primitive data={data} />}
      {type === "text" && <Text data={data} />}
    </div>
  );
}

export default Block;
