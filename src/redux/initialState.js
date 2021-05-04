import { storage } from '~core/utils'
import { defaultStyles, defaultTitle } from '~/constants'

const defaultState = {
  tableTitle: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
