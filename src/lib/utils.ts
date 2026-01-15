import sprite from "../assets/sprite.svg";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const iconArrow = `${sprite}#icon-arrow-circle-broken-right`;
const iconContainer = `${sprite}#icon-container`;
const iconLoading = `${sprite}#icon-loading-03`;
const iconPuzzlePiece = `${sprite}#icon-puzzle-piece-02`;
const iconHexagon = `${sprite}#icon-hexagon-01`;
const iconProject = `${sprite}#icon-Project`;
const iconColors = `${sprite}#icon-colors`;
const iconLightning = `${sprite}#icon-lightning-02`;
const iconStar = `${sprite}#icon-star-04`;
export const iconLogo = `${sprite}#icon-logo`;

import _1 from "../assets/desktop/1.png";
import _2 from "../assets/desktop/2.webp";
import _3 from "../assets/desktop/3.webp";
import _4 from "../assets/desktop/4.webp";
import _5 from "../assets/desktop/5.webp";
import _6 from "../assets/desktop/6.webp";
import _7 from "../assets/desktop/7.webp";
import _8 from "../assets/desktop/8.webp";
import _9 from "../assets/desktop/9.webp";
import _10 from "../assets/desktop/10.webp";
import _11 from "../assets/desktop/11.webp";
import _12 from "../assets/desktop/12.webp";
import _13 from "../assets/desktop/13.webp";
import _14 from "../assets/desktop/14.webp";
import _15 from "../assets/desktop/15.webp";
import _16 from "../assets/desktop/16.webp";

export interface IconType {
  key: string;
  value: string;
}

export const icons: IconType[] = [
  { key: "projectIcon", value: iconProject },
  { key: "starIcon", value: iconStar },
  { key: "loadingIcon", value: iconLoading },
  { key: "puzzleIcon", value: iconPuzzlePiece },
  { key: "containerIcon", value: iconContainer },
  { key: "lightningIcon", value: iconLightning },
  { key: "colorsIcon", value: iconColors },
  { key: "hexagonIcon", value: iconHexagon },
];

export const arrowCircle = iconArrow;

export const backgrounds = [
  { key: "0", value: _1 },
  { key: "1", value: _2 },
  { key: "2", value: _3 },
  { key: "3", value: _4 },
  { key: "4", value: _5 },
  { key: "5", value: _6 },
  { key: "6", value: _7 },
  { key: "7", value: _8 },
  { key: "8", value: _9 },
  { key: "9", value: _10 },
  { key: "10", value: _11 },
  { key: "11", value: _12 },
  { key: "12", value: _13 },
  { key: "13", value: _14 },
  { key: "14", value: _15 },
  { key: "15", value: _16 },
];

export type Board = {
  _id: string;
  title: string;
  userId?: string;
  icon: string;
  background: string;
  createdAt?: string;
  updatedAt?: string;
};

type Column = {
  _id: string;
  boardId: string;
  name: string;
  order: number;
};

export type Task = {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low" | "none" | "";
  deadline: Dayjs | null;
};

export type BoardWithColumns = Board & {
  columns: (Column & { tasks: Task[] })[];
};

export type ColumnWithTask = Column & { tasks: Task[] };

export function mergeBoardData(
  boards: Board[],
  columns: Column[],
  tasks: Task[]
): BoardWithColumns[] {
  return boards.map((board) => {
    const boardColumns = columns
      .filter((col) => col.boardId === board._id)
      .map((col) => ({
        ...col,
        tasks: tasks.filter((task) => task.columnId === col._id),
      }));

    return {
      ...board,
      columns: boardColumns,
    };
  });
}

export const formatDateDayjs = (value: string) => {
  return dayjs.utc(value).tz("Europe/Istanbul").format("DD.MM.YYYY");
};
