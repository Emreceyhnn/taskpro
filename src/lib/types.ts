export const PRIORITIES = {
  low: "#8FA1D0",
  medium: "#E09CB5",
  high: "#BEDBB0",
  none: "rgb(121, 121, 121)",
} as const;

type Priority = keyof typeof PRIORITIES;

export interface ColumnNames {
  title: string;
  id: string;
}

export interface CardParams {
  cardId: string;
  title: string;
  description: string;
  priorities: Priority;
  deadline: string;
  isClose: boolean;
  columnId: string;
  boardId: string;
  columnNames: ColumnNames[];
}

export interface ColumnsParams {
  columnId: string;
  boardId: string;
  title: string;
  cards: CardParams[];
  columnNames: ColumnNames[];
}

export interface BoardParams {
  boardId: string;
  title: string;
  userId: string;
  icon: string;
  background: string;
  columns: ColumnsParams[];
}
