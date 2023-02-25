(function () {
    if (global.proteusTLSMiddleware) return global.proteusTLSMiddleware;

    let res = JSON.parse(global.requestBinding.loadLib(global.requestLibrary));

    if (!res.Success) throw "Failed to Load Request Library: " + res.Error;

    global.proteusTLSMiddleware = class NAPIMiddleware {
        static initClient(config) {
            return new Promise((resolve, reject) => {
                global.requestBinding.initClient(JSON.stringify(config), (err, response) => {
                    if (err) return reject(err);
                    return resolve(response);
                })
            })
        }

        static changeProxy(config) {
            return new Promise((resolve, reject) => {
                global.requestBinding.changeProxy(JSON.stringify(config), (err, response) => {
                    if (err) return reject(err);
                    return resolve(response);
                })
            })
        }

        static cancelRequests(config) {
            return new Promise((resolve, reject) => {
                global.requestBinding.cancelRequests(config, (err, response) => {
                    if (err) return reject(err);
                    return resolve();
                })
            })
        }

        static request(config) {
            return new Promise((resolve, reject) => {
                global.requestBinding.request(JSON.stringify(config), (err, response) => {
                    if (err) {
                        return resolve({
                            Error: true
                        });
                    }
                    let parsedResponse = {
                        Error: true
                    };
                    try {
                        parsedResponse = JSON.parse(response)
                    } catch (e) {
                        console.log(e)
                        return resolve({
                            Error: true
                        });
                    };

                    return resolve(parsedResponse);
                })
            })
        }
    };
    return global.proteusTLSMiddleware;
})();