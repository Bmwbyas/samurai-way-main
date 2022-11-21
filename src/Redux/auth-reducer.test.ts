import {authReducer, AuthStateType, setCaptcha, setUserData} from "./auth-reducer";

let startState: AuthStateType ;

beforeEach(() => {

    startState = { id: null,
        email: null,
        login: null,
        isAuth: false,
        captcha:null
    }
})

test('auth data should be changed', () => {
    const endState = authReducer(startState, setUserData(13,'email','login',false,'sss'))

    expect(endState.id).toBe(13);
    expect(endState.isAuth).toBe(false);
    expect(endState.login).toBe('login');
    expect(endState.email).toBe('email');
    expect(endState.captcha).toBe('sss');

});
test('captcha should be changed', () => {
    const endState = authReducer(startState, setCaptcha('email'))


    expect(endState.captcha).toBe('email');

});