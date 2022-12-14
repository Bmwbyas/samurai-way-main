import {
    changeFollow,
    setCurrentPage, setFollowingInProgress, setIsFetching,
    setTotalCount,
    setUsers, updateUsersParams,
    UsersDataType,
    UsersPageStateType,
    usersReducer
} from "./users-reducer";

let startState: UsersPageStateType ;

beforeEach(() => {

    startState = {
        getUsersParams: {count:6},
        usersData: [{ id: 1,
            name: 'string',
            followed: false,
            status: null,
            uniqueUrlName:  null,
            photos: {
                small: null,
                ladge:  null,
            }},
            { id: 2,
                name: 'string',
                followed: true,
                status: null,
                uniqueUrlName:  null,
                photos: {
                    small: null,
                    ladge:  null,
                }
    }] as UsersDataType[],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] as number[],
        friends: [],
        isLoading:false,
        usersUnknown: []
    }
})

test('Follow should be changed', () => {
    const endState = usersReducer(startState, changeFollow(1))

    expect(endState.usersData[0].followed).toBe(true);

});
test('get user params should be changed', () => {
    const endState = usersReducer(startState, updateUsersParams({page:3,term:'a',friend:false,count:3}))

    expect(endState.getUsersParams.friend).toBe(false);
    expect(endState.getUsersParams.page).toBe(3);
    expect(endState.getUsersParams.term).toBe('a');
    expect(endState.getUsersParams.count).toBe(3);

});
test('user should be set', () => {
    const endState = usersReducer(startState, setUsers([{ id: 3,
        name: 'string',
        followed: true,
        status: null,
        uniqueUrlName:  null,
        photos: {
            small: null,
            ladge:  null,
        }
    }]))

    expect(endState.usersData.length).toBe(1);

});
test('set current page', () => {
    const endState = usersReducer(startState, setCurrentPage(1))

    expect(endState.currentPage).toBe(1);

});
test('set total count', () => {
    const endState = usersReducer(startState, setTotalCount(1))

    expect(endState.totalUsersCount).toBe(1);

});
test('set IsFetching value', () => {
    const endState = usersReducer(startState, setIsFetching(true))

    expect(endState.isFetching).toBe(true);

});
test('set FollowingInProgress value', () => {
    const endState = usersReducer(startState, setFollowingInProgress(true,2))

    expect(endState.followingInProgress[0]).toBe(2);

});
