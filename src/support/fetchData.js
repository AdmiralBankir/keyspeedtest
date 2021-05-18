const fetchSettings = {
    url: 'https://baconipsum.com/api/',
    type: 'meat-and-filler',
    paras: 1,
    format: 'text'
};

const getRequestBody = () => {
    let request = fetchSettings.url + '?';
    for(let key in fetchSettings) {
        if(key !== 'url') {
            request += key + '=' + fetchSettings[key] + '&';
        }
    }
    return request.slice(0, -1);
};

export default getRequestBody;
