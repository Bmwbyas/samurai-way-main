import {
    addPostActionCreator, deletePost,
    PostDataType,
    ProfilePageStateType,
    profileReducer, savePhotoSuccess,
    setProfileStatus, setUserProfile,
    UserProfileType
} from "./profile-reduser";
import {v1} from "uuid";

let startState: ProfilePageStateType;

beforeEach(() => {

    startState = {
        postData: [
            {id: 'id1', message: "Hi,how are you?", likesCount: 10},
            {id: 'id2', message: "It's my first post", likesCount: 16},
        ] as PostDataType[],
        commentData: {
            ['id1']: [{id: v1(), comment: 'blabla', like: 1}, {id: v1(), comment: 'trololo', like: 2}],
            ['id2']: [{id: v1(), comment: 'oi', like: 0}, {id: v1(), comment: 'tili', like: 3}]
        },
        newStatus: '',
        profile: null as UserProfileType | null

    }
})
test('post should be deleted', () => {
    const endState = profileReducer(startState, deletePost('id1'))

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
            aboutMe: 'ddddd',
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
test('set profile photo ', () => {
    const endState = profileReducer(startState, savePhotoSuccess(
        {
            small: 'string',
            large: 'num',
        }
    ))

    expect(endState.profile?.photos.small).toBe('string');
    expect(endState.profile?.photos.large).toBe('num');
});
