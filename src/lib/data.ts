import type { BoardParams } from "./types";

export const mockBoardData: BoardParams[] = [
  /* ------------------------------- BOARD 1 ------------------------------- */
  {
    boardId: "board-1",
    title: "Project Mayhem",
    userId: "user-1",
    icon: "projectIcon",
    background: "1",
    columns: [
      {
        columnId: "b1-col-1",
        boardId: "board-1",
        title: "To Do",
        cards: [
          {
            cardId: "b1-card-1",
            title: "Design login page",
            description: "Create modern login UI.",
            priorities: "high",
            deadline: "2026-01-12",
            isClose: true,
            columnId: "b1-col-1",
            boardId: "board-1",
          },
          {
            cardId: "b1-card-3",
            title: "Design login page",
            description: "Create modern login UI.",
            priorities: "high",
            deadline: "2026-01-12",
            isClose: true,
            columnId: "b1-col-1",
            boardId: "board-1",
          },
          {
            cardId: "b1-card-4",
            title: "Design login page",
            description: "Create modern login UI.",
            priorities: "high",
            deadline: "2026-01-12",
            isClose: true,
            columnId: "b1-col-1",
            boardId: "board-1",
          },
          {
            cardId: "b1-card-5",
            title: "Design login page",
            description: "Create modern login UI.",
            priorities: "high",
            deadline: "2026-01-12",
            isClose: true,
            columnId: "b1-col-1",
            boardId: "board-1",
          },
        ],
      },
      {
        columnId: "b1-col-2",
        boardId: "board-1",
        title: "In Progress",
        cards: [
          {
            cardId: "b1-card-2",
            title: "Drag & Drop",
            description: "Implement drag and drop.",
            priorities: "high",
            deadline: "2026-01-22",
            isClose: false,
            columnId: "b1-col-2",
            boardId: "board-1",
          },
        ],
      },
      {
        columnId: "b1-col-3",
        boardId: "board-1",
        title: "Done",
        cards: [],
      },
    ],
  },

  /* ------------------------------- BOARD 2 ------------------------------- */
  {
    boardId: "board-2",
    title: "Personal Tasks",
    userId: "user-1",
    icon: "starIcon",
    background: "2",
    columns: [
      {
        columnId: "b2-col-1",
        boardId: "board-2",
        title: "Planned",
        cards: [
          {
            cardId: "b2-card-1",
            title: "Gym schedule",
            description: "Prepare weekly workout plan.",
            priorities: "medium",
            deadline: "2026-01-13",
            isClose: false,
            columnId: "b2-col-1",
            boardId: "board-2",
          },
        ],
      },
      {
        columnId: "b2-col-2",
        boardId: "board-2",
        title: "Active",
        cards: [],
      },
      {
        columnId: "b2-col-3",
        boardId: "board-2",
        title: "Completed",
        cards: [
          {
            cardId: "b2-card-2",
            title: "Buy groceries",
            description: "Weekly shopping done.",
            priorities: "low",
            deadline: "2026-01-09",
            isClose: true,
            columnId: "b2-col-3",
            boardId: "board-2",
          },
        ],
      },
    ],
  },

  /* ------------------------------- BOARD 3 ------------------------------- */
  {
    boardId: "board-3",
    title: "Work Sprint",
    userId: "user-1",
    icon: "lightningIcon",
    background: "3",
    columns: [
      {
        columnId: "b3-col-1",
        boardId: "board-3",
        title: "Backlog",
        cards: [
          {
            cardId: "b3-card-1",
            title: "API refactor",
            description: "Clean up controllers and services.",
            priorities: "high",
            deadline: "2026-01-18",
            isClose: false,
            columnId: "b3-col-1",
            boardId: "board-3",
          },
        ],
      },
      {
        columnId: "b3-col-2",
        boardId: "board-3",
        title: "In Review",
        cards: [],
      },
      {
        columnId: "b3-col-3",
        boardId: "board-3",
        title: "Done",
        cards: [
          {
            cardId: "b3-card-2",
            title: "Project setup",
            description: "Initial project configuration.",
            priorities: "none",
            deadline: "2026-01-05",
            isClose: true,
            columnId: "b3-col-3",
            boardId: "board-3",
          },
        ],
      },
    ],
  },
];
