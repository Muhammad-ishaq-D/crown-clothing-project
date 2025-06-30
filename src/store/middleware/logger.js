
// we can make our own middleware like logger(using carry function)
const loggedMiddleWare = (store) => (next) => (action) => {
    if(!action.type){
        return next(action)
    }
    console.log('type', action.type);
    console.log('payload', action.payload); 
    console.log('currentState', store.getState()); 

    next(action);
    console.log('Next State', store.getState()); 
};

