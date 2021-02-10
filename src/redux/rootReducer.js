import { TABLE_RESIZE, TEXT_CHANGE } from './types'

export function rootReducer(state, action) {
  let prevState
  let field

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'row' ? 'rowState' : 'colState'
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value

      return { ...state, [field]: prevState }

    case TEXT_CHANGE:
      prevState = state.dataState || {}
      prevState[action.data.id] = action.data.value || undefined
      return { ...state, currentText: action.data.value, dataState: prevState }

    default: return state
  }
}
