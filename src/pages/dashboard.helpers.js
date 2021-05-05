import { storage } from '~core/utils'

function toHTML(key) {
  const id = key.split(':')[1]
  const { tableTitle, openedDate } = storage(key)

  return `
    <li class="db__item">
      <a href="#excel/${id}">${tableTitle}</a>
      <strong>${openedDate}</strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('excel')) {
      keys.push(key)
    }
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) return `<p class='db__empty'>No any spreadsheets yet</p>`

  return `
    <div class="db__list-header">
      <span>Title</span>
      <span>View date</span>
    </div>
    
    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}
