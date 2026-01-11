import sprite from "../assets/sprite.svg";

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

// <svg width="20" height="20">
//         <use href="src/img/sprite.svg#icon-search-3"></use>
//       </svg>

import _1 from "../assets/desktop/1.png";
import _2 from "../assets/desktop/2.jpg";
import _3 from "../assets/desktop/3.jpg";
import _4 from "../assets/desktop/4.jpg";
import _5 from "../assets/desktop/5.jpg";
import _6 from "../assets/desktop/6.jpg";
import _7 from "../assets/desktop/7.jpg";
import _8 from "../assets/desktop/8.jpg";
import _9 from "../assets/desktop/9.jpg";
import _10 from "../assets/desktop/10.jpg";
import _11 from "../assets/desktop/11.jpg";
import _12 from "../assets/desktop/12.jpg";
import _13 from "../assets/desktop/13.jpg";
import _14 from "../assets/desktop/14.jpg";
import _15 from "../assets/desktop/15.jpg";
import _16 from "../assets/desktop/16.jpg";

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
  { key: "1", value: _1 },
  { key: "2", value: _2 },
  { key: "3", value: _3 },
  { key: "4", value: _4 },
  { key: "5", value: _5 },
  { key: "6", value: _6 },
  { key: "7", value: _7 },
  { key: "8", value: _8 },
  { key: "9", value: _9 },
  { key: "10", value: _10 },
  { key: "11", value: _11 },
  { key: "12", value: _12 },
  { key: "13", value: _13 },
  { key: "14", value: _14 },
  { key: "15", value: _15 },
  { key: "16", value: _16 },
];
