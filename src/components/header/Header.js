import { ExcelComponent } from '~core/ExcelComponent'
import * as actions from '~/redux/actions'
import { $ } from '~core/Dom'
import { debounce } from '~core/utils'
import { defaultTitle } from '~/constants'
import { ActiveRoute } from '~core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click', 'input', 'keydown'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().tableTitle || defaultTitle
    return `
      <input id="table-title" data-item="title" type="text" value="${title}"/>
      <div>
        <div class="button" title="Delete spreadsheet" data-item="delete">
          <i class="material-icons" data-button="delete">delete_outline</i>
        </div>

        <div class="button" title="Back to dashboard" data-item="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `
  }

  onClick(e) {
    const $target = $(e.target)

    switch ($target.data.item) {
      case 'delete':
        if (confirm('Are you sure you want to delete this spreadsheet?')) {
          localStorage.removeItem(`excel:${ActiveRoute.param}`)
          ActiveRoute.navigate('')
        }
        break
      case 'exit':
        ActiveRoute.navigate('')
        break
      case 'input':
      default:
        this.$emit('tableTitle:input')
    }
  }

  onInput(e) {
    this.$dispatch(actions.titleChange(e.target.value))
  }

  onKeydown(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      this.$emit('tableTitle:done')
    }
  }
}
