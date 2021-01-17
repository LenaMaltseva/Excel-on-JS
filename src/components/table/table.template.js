const CHAR_CODES = {
  A: 65,
  Z: 90,
}

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODES.A + index)
}


function toColumn(content) {
  return `<div class="column">${content}</div>`
}

function toCell(content) {
  return `<div class="cell" contenteditable>${content}</div>`
}

function createRow(content, index = '') {
  return `
    <div class='row'>
      <div class="row__info">${index}</div>
      <div class="row__data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 10) {
  const rows = []

  const colsCount = CHAR_CODES.Z - CHAR_CODES.A + 1
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
