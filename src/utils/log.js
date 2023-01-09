import { DEV_STAGE } from '../environments/env';

const info = function (tag = 'info', message) {
    if(DEV_STAGE === 'dev') {
        console.log(`${tag}: `, message);
    }
};

export default {
    info
};
