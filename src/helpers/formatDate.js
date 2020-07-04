import moment from 'moment';

export const formatDate = (dateString) => {
    if (dateString) {
        return moment.utc(dateString).format('DD/MM/YYYY');
    } else {
        return '';
    }
}