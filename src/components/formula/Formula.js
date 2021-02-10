import { $ } from '~core/Dom'
import { ExcelComponent } from '~core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$subscribe(state => this.$formula.text(state.currentText))
  }

  onInput(e) {
    this.$emit('formula:input', $(e.target).text())
  }

  onKeydown(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      this.$emit('formula:done')
    }
  }
}
