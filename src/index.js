import './styles/index.scss'
import { Excel, Header, Toolbar, Formula, Table } from '~/components'
import { createStore } from '~core/createStore'
import { rootReducer } from '~/redux/rootReducer'
import { storage } from '~core/utils'
import { initialState } from '~/redux/initialState'

const store = createStore(rootReducer, initialState)
store.subscribe(state => {
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
