import { $ } from '~core/Dom'
import { ExcelComponent } from '~core/ExcelComponent'
import * as actions from '~/redux/actions'
import { createTable } from './table.template'
import {
  shouldResize,
  isCell,
  isMultiSelect,
  getMatrix,
  isKeyBoardNav,
  getNextSelector,
} from './helpers'
import { handleResize } from './table.resize'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable(30, this.store.getState())
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(e) {
    try {
      const data = await handleResize(e, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (err) {
      console.warn('Resize table went wrong:', err)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.textChange({
      id: this.selection.current.id(),
      value,
    }))
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)

      if (isMultiSelect(e)) {
        const $current = this.selection.current
        const $cells = getMatrix($current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(e) {
    if (isKeyBoardNav(e) && !e.shiftKey) {
      e.preventDefault()

      const currentId = $(e.target).id(true)
      const $next = this.$root.find(getNextSelector(e, currentId))
      this.selectCell($next)
    }
  }

  onInput(e) {
    this.updateTextInStore($(e.target).text())
  }
}
