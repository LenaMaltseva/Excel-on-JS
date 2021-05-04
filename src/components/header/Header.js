import { ExcelComponent } from '~core/ExcelComponent'
import * as actions from '~/redux/actions'
import { debounce } from '~core/utils'
import { defaultTitle } from '~/constants'

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
      <input id="table-title" type="text" value="${title}"/>
      <div>
        <div class="button">
          <i class="material-icons">delete_outline</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
  }

  onClick() {
    this.$emit('tableTitle:input')
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
