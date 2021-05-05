import { Page } from '~core/Page'
import { $ } from '~core/Dom'
import { createRecordsTable } from './dashboard.helpers'

export class DashboardPage extends Page {
  getRoot() {
    const id = Date.now().toString()
    return $.create('div', 'db').html(`
      <div class="db">
        <div class="db__header">
          <h1>Excel dashboard</h1>
        </div>

        <div class="db__new">
          <div class="db__container">
            <a href="#excel/${id}" class="db__create">
              <i class="material-icons">add</i>
              create new
            </a>
          </div>
        </div>

        <div class="db__table db__container">
          ${createRecordsTable()}
        </div>
      </div>
    `)
  }
}
