import * as moment from "moment";

export const GetRecordListMock = {
    pageParams: {
        perPage: 6,
        currentPage: 1,
        total: 12
    },
    data: [
        {
            id: 1,
            userName: "彭浚翔",
            userAccount: "10430004",
            collegeName: "資訊學院",
            departmentName: "資工系",
            departmentSubName: "專案",
            identity: "student",
            deviceId: 1,
            deviceName: "裝置名稱",
            temperature: "36.8",
            createdTime: "2021-10-18 08:56:43"
        }
    ]
}

export const GetHomeDeviceRecordMock = (() => {
    const record = {
        id: 1,
        userName: "彭浚翔",
        userAccount: "10430004",
        collegeName: "資訊學院",
        departmentName: "資工系",
        departmentSubName: "專案",
        identity: "student",
        deviceId: 1,
        deviceName: "裝置名稱",
        temperature: "36.8",
        createdTime: "2021-10-18 08:56:43"
    };
    const list = [];
    for(let i = 1; i <= 70; i++) {
        const deviceId = (i % 4) + 1;
        const temperatureArr = [35.2,36.4,36.2,37.1,36.8,38.2,37.8,37.5,36.3];
        const temperature = temperatureArr[Math.floor(Math.random()*(9))];
        const data = { ...record, deviceId, temperature};
        list.push(data);
    };
    return { data: list };
    // const recordList = [1,2,3,4].map(x => {
    //     const deviceId = x;
    //     return { ...record, deviceId }
    // });
    // return {
    //     data: [...recordList, ...recordList, ...recordList, ...recordList, ...recordList]
    // };
})();

export const GetRecordListForStaffMock = (() => {
    const record = {
        id: 1,
        userName: "彭浚翔",
        userAccount: "10430004",
        collegeName: "資訊學院",
        departmentName: "資工系",
        departmentSubName: "專案",
        identity: "student",
        deviceId: 1,
        deviceName: "裝置名稱",
        temperature: "36.8",
        createdTime: "2021-10-18 08:56:43"
    };
    const list = [];
    for(let i = 1; i <= 600; i++) {
        const deviceId = (i % 4) + 1;
        const index = Math.floor(Math.random()*(3));
        const createdTime = moment().add(-(i%7), 'days').format(`YYYY/MM/DD ${i%7 + 9}:mm:ss`);
        const temperatureArr = [36.5, 36.4, 38.2];
        const temperature = temperatureArr[index];
        const data = { ...record, deviceId, temperature, createdTime};
        list.push(data);
    };
    return { data: list };
})();