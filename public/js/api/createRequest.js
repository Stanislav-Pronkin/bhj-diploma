/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const data = options.data;
    const method = options.method;
    let url = options.url;
    const headers = options.headers;

    let inform = [];

    if (options.data) {
        for (const item in options.data) {
            if (options.data.hasOwnProperty(item)) {

                const unit = `${item}=${options.data[item]}`;

                inform.push(unit);
            }
        }
    }

    //let question = JSON.stringify(data)
    //console.log(`Запрос серверу ${question}`);
    //console.log(`Метод ${method}`);
    //console.log(`Адрес ${url}`);

    const xhr = new XMLHttpRequest;

    for (let header in headers) {
        if (headers.hasOwnProperty(header)) {
            xhr.setRequestHeader(header, headers[header]);
            console.log(header, headers[header]);
        }
    }

    xhr.responseType = options.responseType;
    xhr.withCredentials = true;

    if (method == "GET") {
        const dataUrl = inform.join('&');

        url = `${url}?${dataUrl}`;
        xhr.open(method, url);
        xhr.send();
    } else {
        const formData = new FormData();

        for (let item in options.data) {
            if (options.data.hasOwnProperty(item)) {
                formData.append(item, options.data[item]);
            }
        }

        xhr.open(method, url);
        xhr.send(formData);
    }

    xhr.onload = () => {
        try {
            if (xhr.status != 200) {
                const err = xhr.response.error;
                
                options.callback(err);
            } else {
                options.callback(null, xhr.response);
                //const answer = JSON.stringify(xhr.response);
                //console.log(`Ответ от сервера ${answer}`);
                //console.log(`Статус ответа ${xhr.status}`);
                if (xhr.response.error != null) {
                    throw new Error(xhr.response.error);
                }
            }

        } catch (error) {
            console.error(error);
        }
    }
};
