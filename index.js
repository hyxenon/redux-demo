const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
    return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty

    }
}

// const initialState = {
//     numOfCakes: 10,
//     numberOfIceCreams: 20
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numberOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default: return state
    }

}



const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - action.payload
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams + action.payload
            }
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1
            }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer)
console.log("Initial state", store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState());
})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake())

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake()
actions.orderIceCream(2)
actions.restockIceCream(1)

unsubscribe()
