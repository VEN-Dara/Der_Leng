import moment from 'moment';

const formatTime = (momentObj) => {
    if (!moment.isMoment(momentObj)) return null;
    return momentObj.format('HH:mm:ss'); // Adjust the format as per the API requirement
};

export default formatTime
