import { TABLE_RESIZE, TEXT_CHANGE, CHANGE_STYLES, APPLY_STYLE } from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function textChange(data) {
  return {
    type: TEXT_CHANGE,
    data,
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  }
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  }
}
