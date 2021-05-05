import {
  TABLE_RESIZE,
  TEXT_CHANGE,
  CHANGE_STYLES,
  APPLY_STYLE,
  TITLE_CHANGE,
  UPDATE_DATE,
} from './types'

export function rootReducer(state, action) {
  let field
  let newState

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'row' ? 'rowState' : 'colState'
      return {
        ...state,
        ...updateField(field, state, action),
      }

    case TEXT_CHANGE:
      return {
        ...state,
        currentText: action.data.value,
        ...updateField('dataState', state, action),
      }

    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data,
      }

    case APPLY_STYLE:
      newState = { ...state.stylesState } || {}
      action.data.ids.forEach(id => newState[id] = newState[id]
          ? { ...newState[id], ...action.data.value }
          : action.data.value
      )
      return {
        ...state,
        currentStyles: { ...state.currentStyles, ...action.data.value },
        stylesState: newState,
      }

    case TITLE_CHANGE:
      return {
        ...state,
        tableTitle: action.data,
      }

    case UPDATE_DATE:
      return {
        ...state,
        openedDate: new Date().toLocaleString('ru'),
      }

    default: return state
  }
}

const updateField = (field, state, action) => {
  const value = state[field] || {}
  value[action.data.id] = action.data.value || undefined

  return { [field]: value }
}
