const defaults = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
};

export class FetchAdapter {

    static request(url, options = {}) {
        let requestOptions = {...defaults, ...options};

        return window
            .fetch(url, requestOptions)
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(res);
                }
                else {
                    return res.text();
                }
            })
            .then((data) => {
                if (data) {
                    try {
                        return JSON.parse(data.toString());
                    } catch (err) {
                        return data;
                    }
                }
                return '';
            })
            .catch((err) => {
                if (err.text) {
                    return err.text().then((errorMessage) => {
                        let error;
                        try {
                            error = JSON.parse(errorMessage);
                        } catch (err) {
                            error = err;
                        }
                        return Promise.reject(error);
                    });
                }
                return Promise.reject(err);
            });
    }

}
