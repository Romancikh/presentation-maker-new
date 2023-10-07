type FontFamily = string;

type Color = string;

type Position = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type Char = {
  value: string;
  fontSize: number;
  fontFamily: FontFamily;
  color: Color;
  bold: boolean;
  italic: boolean;
  underlined: boolean;
};

type Block = {
  id: string;
  position: Position;
  size: Size;
  rotation: number;
};

type Text = Block & {
  type: "TEXT";
  content: Char[];
};

type Image = Block & {
  type: "IMAGE";
  content: string;
};

type Primitive = Block & {
  type: "PRIMITIVE";
  form: "TRIANGLE" | "ELLIPSE" | "RECTANGLE";
};

type Operation = {
  id: string;
  data: object;
  prev: Operation | null;
  next: Operation | null;
};

type History = {
  topOperation: Operation;
};

type Slide = {
  id: string;
  background: Color;
  selectObjects: Array<Text | Image | Primitive>;
  objects: Array<Text | Image | Primitive>;
};

type Presentation = {
  name: string;
  currentSlide: Slide | null;
  selectSlides: Slide[];
  slides: Slide[];
};

export type {
  Block,
  Char,
  Color,
  FontFamily,
  History,
  Image,
  Operation,
  Position,
  Presentation,
  Primitive,
  Size,
  Slide,
  Text,
};