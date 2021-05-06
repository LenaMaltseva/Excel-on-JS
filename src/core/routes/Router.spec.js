import { Router } from './Router'
import { Page } from '../page/Page'

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}

class ExcelPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = '<h1>excel</h1>'
    return root
  }
}

describe('Router:', () => {
  let location
  let router
  let $root

  beforeAll(() => {
    location = document.location
  })

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })

  test('should render Excel page', () => {
    location.hash = '#excel'
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div><h1>excel</h1></div>')
  })
})
