import {appReducer, AppStateInitialType, initializedSuccessApp} from "./app-reducer";

let startState: AppStateInitialType ;

beforeEach(() => {

    startState = { initialized:false ,error:null }
})

test('initialized should be changed', () => {
    const endState = appReducer(startState, initializedSuccessApp())

    expect(endState.initialized).toBe(true);

});