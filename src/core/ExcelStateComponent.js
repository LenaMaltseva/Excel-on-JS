import { ExcelComponent } from '~core/ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }

  get template() {
    throw new Error(`Should implement this method in ${ExcelComponent.name}`)
    // return JSON.stringify(this.state, null, 2)
  }

  initState(initialState = {}) {
    this.state = { ...initialState }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }
    this.$root.html(this.template)
  }
}
