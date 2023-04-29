import { createVar, style } from "@vanilla-extract/css"

import { GEOMETRY, LeafColorNumbers, ThemeTimeout } from "../../utils/constants"
import { lookAtPoint } from "../../utils/math"
import { geometryToStyles } from "../../utils/style"

const leafyGreenVar = createVar()
const pinkRedVar = createVar()
const mudPurpleVar = createVar()

export const growingLeafVar = createVar()
export const fullLeafVar = createVar()

export const skyColorVar = createVar()
export const leafBackgroundVar = createVar()

export const colorTransitionVar = createVar()
export const movementTransitionVar = createVar()

export const leftScaleVar = createVar()
export const rightScaleVar = createVar()
export const leftAngleVar = createVar()
export const rightAngleVar = createVar()
export const polarityXVar = createVar()
export const polarityYVar = createVar()
export const visualXVar = createVar()
export const visualYVar = createVar()
export const rightRotationVar = createVar()
export const leftRotationVar = createVar()

export const startupCoords = {
  target: {
    x: 12,
    y: 12,
  },
  canvasRect: {
    top: 0,
    left: 0,
    width: 100,
  },
}

export const startupGeometry = lookAtPoint(
  startupCoords.target.x,
  startupCoords.target.y,
  startupCoords.canvasRect,
)

export const sunColorRgb = "rgb(253 184 19)"

export const LeafColorVars = {
  [leafyGreenVar]: LeafColorNumbers["leafyGreen"],
  [pinkRedVar]: LeafColorNumbers["pinkRed"],
  [mudPurpleVar]: LeafColorNumbers["mudPurple"],
} as const

export const fractalVars = style({
  vars: {
    /* colors */
    [skyColorVar]: "46, 181, 229",
    ...LeafColorVars,

    /* default theme */
    [growingLeafVar]: leafyGreenVar,
    [leafBackgroundVar]: growingLeafVar,
    [fullLeafVar]: "128, 128, 128",

    /* animatin config */
    [colorTransitionVar]: `${ThemeTimeout / 2}ms`,
    [movementTransitionVar]: `${ThemeTimeout / 3}ms`,

    /* startupGeometry */
    ...geometryToStyles(startupGeometry),

    [rightRotationVar]: rightAngleVar,
    [leftRotationVar]: `calc(-1 * ${leftAngleVar})`,
  },
})

export const canvas = style({
  display: "flex",
  width: "100%",
  aspectRatio: "1",
  position: "relative",
  zIndex: 1,
  touchAction: "none",
  selectors: {
    "&:before": {
      content: "",
      zIndex: "-1",
      position: "absolute",
      background: `rgb(${growingLeafVar})`,
      transition: `background ${colorTransitionVar} ease-in, top ${movementTransitionVar} ease-out, left ${movementTransitionVar} ease-out`,
      transitionTimingFunction: "ease-in-out",
      width: "100%",
      height: "100%",
      top: `calc(-10% * -1 * ${polarityYVar})`,
      left: `calc(-10% * ${polarityXVar})`,
      filter: "blur(100px)",
    },
    "&:after": {
      content: "",
      zIndex: "-2",
      position: "absolute",
      background: `rgba(${growingLeafVar}, .5)`,
      transition: `background ${colorTransitionVar} ease-in`,
      transitionTimingFunction: "ease-in-out",
      width: "100%",
      height: "100%",
      top: "4%",
      left: "4%",
      filter: "invert(100%)",
    },
  },
})

export const canvasInner = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  background: `radial-gradient(circle at 50% -1000%, rgba(${skyColorVar}) 92%, white 96%)`,
  "@media": {
    "screen and (prefers-color-scheme: dark)": {
      background: `radial-gradient(circle at 50% -1000%, rgb(0, 0, 30) 95%, rgb(0, 0, 70) 99%)`,
    },
  },
})

export const base = style({
  width: `${GEOMETRY.canvasToBaseNodeRatio * 100}%`,
  height: `${GEOMETRY.canvasToBaseNodeRatio * 100}%`,
  zIndex: 2,
})

export const visualTargetTransition = "100ms ease-out"

export const visualTarget = style({
  position: "absolute",
  top: visualYVar,
  left: visualXVar,
  width: "12%",
  height: "12%",
  translate: "-50% -50%",
  transition: `all ${visualTargetTransition}`,
  userSelect: "none",
  zIndex: 1,
})

export const targetBall = style({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  background: sunColorRgb,
  opacity: "0.9",
  boxShadow: `0px 0px 40px 15px ${sunColorRgb}`,
  "@media": {
    "screen and (prefers-color-scheme: dark)": {
      background: "rgb(246, 241, 213)",
      boxShadow: `0px 0px 40px 15px gray`,
    },
  },
})

export const ballInner = style({
  position: "relative",
  height: "100%",
  selectors: {
    "&:before": {
      content: "← drag me",
      fontFamily: `"HelveticaNeue", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif`,
      position: "absolute",
      top: "50%",
      translate: "0 -50%",
      left: "calc(100% + 20px)",
      whiteSpace: "nowrap",
    },
    "&.hidden:before": {
      visibility: "hidden",
    },
  },
})

export const impossible = style({
  width: "100px",
  height: "100px",
  background: "black",
  border: "4px dashed cyan",
})
