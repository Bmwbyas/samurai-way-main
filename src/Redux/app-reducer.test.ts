import {appReducer, AppStateInitialType, initializeApp, initializedSuccessApp} from "./app-reducer";

let startState: AppStateInitialType ;

beforeEach(() => {

    startState = { initialized:false}
})

test('initialized should be changed', () => {
    const endState = appReducer(startState, initializedSuccessApp())

    expect(endState.initialized).toBe(true);

});