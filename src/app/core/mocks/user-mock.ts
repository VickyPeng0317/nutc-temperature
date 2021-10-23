export const GetUserListMock = {
    pageParams: {
        perPage: 6,
        currentPage: 1,
        total: 12
    },
    data: [
        {
            userAccount: "10430004",
            userName: "彭浚翔",
            collegeName: "資訊學院",
            departmentName: "資工系",
            departmentSubName: "專二",
            identity: "student"
        },
        {
            userAccount: "tctctceteacher",
            userName: "彭翔浚",
            collegeName: "資訊學院",
            departmentName: "資工系",
            departmentSubName: "教授",
            identity: "teacher"
        }
    ]
};


export const GetUserInfoMock = {
    userAccount: "10430004",
    userName: "彭浚翔",
    collegeName: "資訊學院",
    departmentName: "資工系",
    departmentSubName: "專二",
    identity: "student"
};

export const LoginMock = {
    isSuccess: true,
    data: {
        userId: 1,
        userAccount: "10430004",
        userName: "彭浚翔",
        collegeName: "資訊學院",
        departmentName: "資工系",
        departmentSubName: "專二",
        identity: "student"
    }
};