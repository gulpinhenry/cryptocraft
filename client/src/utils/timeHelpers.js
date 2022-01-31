import moment from 'moment';

export function hourTimeInterval(graphDataPoints) {
    var intervalLabels = [];
    const timeStart = moment();
    for (var i = 0; i < graphDataPoints.length; i++) {
        const unixT = (timeStart - (i * 3600000)); // time is milliseconds, thus, 3 digits are added on the end of each unix integer.
        const timePoint = moment(unixT).format('MMM-DD-YYYY, HH:00');
        intervalLabels.push(timePoint);
    }
    return intervalLabels.reverse();
}

export function sixHourTimeInterval(graphDataPoints) {
    var intervalLabels = [];
    const timeStart = moment();
    for (var i = 0; i < graphDataPoints.length; i++) {
        const unixT = (timeStart - (i * 21600000)); // time is milliseconds, thus, 3 digits are added on the end of each unix integer.
        const timePoint = moment(unixT).format('MMM-DD-YYYY, HH:00:00');
        intervalLabels.push(timePoint);
    }
    return intervalLabels.reverse();
}

export function dayTimeInterval(history) {
    var intervalLabels = [];
    const timeStart = moment();
    for (var i = 0; i < history.length; i++) {
        const unixT = (timeStart - (i * 86400000)); // time is milliseconds, thus, 3 digits are added on the end of each unix integer.
        const timePoint = moment(unixT).format('M-D-YYYY');
        intervalLabels.push(timePoint);
    }
    return intervalLabels.reverse();
}

export function weekTimeInterval(history) {
    var intervalLabels = [];
    const timeStart = moment();
    for (var i = 0; i < history.length; i++) {
        const unixT = (timeStart - (i * 604800000)); // time is milliseconds, thus, 3 digits are added on the end of each unix integer.
        const timePoint = moment(unixT).format('M-D-YYYY');
        intervalLabels.push(timePoint);
    }
    return intervalLabels.reverse();
}
