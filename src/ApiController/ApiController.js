// for testing
import fakeDeviceInfo from './fakeDeviceInfo.json';
import fakeDownloadList from './fakeDownloadList.json';

const fetch = require('node-fetch');

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const downloadNode = (Detail) => {
    return {
        name:Detail.name,
        description:Detail.description,
        version:Detail.version,
        releaseDate:Detail.releaseDate,
        size:Detail.size,
        downloadLink:Detail.downloadLink
    };
};

const deviceInfoNode = (Detail) => {
    return {
        modelname:Detail.ModelName,
        snid:Detail.SNID,
        sn:Detail.SN,
        os:Detail.OS,
        biosversion:Detail.BIOSVersion,
        lastchecktime:Detail.Lastchecktime
    };
};

export async function GetDownloadList () {

    // access fake data

    return fakeDownloadList.map((DataDetail, index) => {
        return {
            ...downloadNode(DataDetail),
            children: range(index).map(downloadNode)
        };
    });

}

export function GetDeviceInfo () {

}