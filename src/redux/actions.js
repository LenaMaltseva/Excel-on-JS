import {
  TABLE_RESIZE,
  TEXT_CHANGE,
  CHANGE_STYLES,
  APPLY_STYLE,
  TITLE_CHANGE,
} from './types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  }
}

export function titleChange(data) {
  return {
    type: TITLE_CHANGE,
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
