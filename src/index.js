import './styles/index.scss'
import { Excel, Header, Toolbar, Formula, Table } from '~/components'
import { createStore } from '~core/createStore'
import { rootReducer } from '~/redux/rootReducer'
import { storage, debounce } from '~core/utils'
import { initialState } from '~/redux/initialState'

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
