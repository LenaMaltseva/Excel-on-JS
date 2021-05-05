import { createStore } from './createStore'

const initialState = {
  count: 0,
}

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: ++state.count }
  }
  return state
}

describe('createStore:', () => {
  let store
  let handler

  beforeEach(() => {
    store = createStore(reducer, initialState)
    handler = jest.fn()
  })

  test('should return store object', () => {
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })

  test('should return state as an object', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should return changed state after dispatched action', () => {
    store.dispatch({ type: 'ADD' })
    expect(store.getState().count).toBe(1)
  })

  test('should return unchanged state if dispatched action didn\'t exist',
      () => {
        store.dispatch({ type: 'WRONG' })
        expect(store.getState().count).toBe(0)
      })

  test('should call subscriber function', () => {
    store.subscribe(handler)
    store.dispatch({ type: 'ADD' })

    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('should not call subscriber function after unsubscribe', () => {
    const subscription = store.subscribe(handler)
    subscription.unsubscribe()
    store.dispatch({ type: 'ADD' })

    expect(handler).not.toHaveBeenCalled()
  })

  test('should dispatch action in async way', async () => {
    await setTimeout(() => {
      store.dispatch({ type: 'ADD' })
    }, 500)
    setTimeout(() => {
      expect(store.getState().count).toBe(1)
    }, 1000)
  })
})
