import {
    addPostActionCreator, deletePost,
    PostDataType,
    ProfilePageStateType,
    profileReducer,
    setProfileStatus, setUserProfile,
    UserProfileType
} from "./profile-reduser";

let startState: ProfilePageStateType;

beforeEach(() => {

    startState = {
        postData: [
            {id: 1, message: "Hi,how are you?", likesCount: 10},
            {id: 2, message: "It's my first post", likesCount: 16},
        ] as PostDataType[],
        newStatus: '',
        profile: null as UserProfileType | null

    }
})
test('post should be deleted', () => {
    const endState = profileReducer(startState, deletePost(1))

    expect(endState.postData.length).toBe(1);
});
test('profile status should be changed', () => {
    const endState = profileReducer(startState, setProfileStatus('text'))

    expect(endState.newStatus).toBe('text');
});
test('post should be added', () => {
    const endState = profileReducer(startState, addPostActionCreator('post'))

    expect(endState.postData[0].message).toBe('post');
});
test('set user data should be added', () => {
    const endState = profileReducer(startState, setUserProfile(
        {
            userId: 6,
            lookingForAJob: false,
            lookingForAJobDescription: 'string',
            fullName: 'string',
            contacts: {
                github: 'string',
                vk: 'string',
                facebook: 'string',
                instagram: 'string',
                twitter: 'string',
                website: 'string',
                youtube: 'string',
                mainLink: 'string',
            },
            photos: {
                small: 'string',
                large: 'string',
            }
        }))

    expect(endState.profile?.userId).toBe(6);
    expect(endState.profile?.contacts?.vk).toBe('string');
});