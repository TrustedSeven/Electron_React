class RequestClient {
  constructor(clientID) {
    this.clientID = clientID;
    this.defaultFollowRedirect = true;
    this.clientStop = false;
    this.activeRequests = {};
  }

  async init(config) {
    const clientConfig = Object.assign(
      {
        Id: this.clientID,
      },
      config
    );

    const res = JSON.parse(
      await global.proteusTLSMiddleware.initClient(clientConfig)
    );

    // if (res.Error) throw "Error initalizing client:" + res.Error;
    return res;
  }

  async cancelRequests() {
    this.clientStop = true;
    let tempActiveRequestPromises = [];
    for (let tempRequest in this.activeRequests) {
      tempActiveRequestPromises.push(this.activeRequests[tempRequest]);
    }
    await Promise.allSettled(tempActiveRequestPromises);
    return global.proteusTLSMiddleware.cancelRequests(this.clientID);
  }

  changeProxy(formattedProxy) {
    if (this.clientStop) return;
    return global.proteusTLSMiddleware.changeProxy({
      id: this.clientID,
      proxy: formattedProxy,
    });
  }

  async clientSendRequest(requestConfig) {
    // if (this.clientStop) return -1;
    // let requestResolve,
    //     requestID = randomUUID();
    // let requestPromise = new Promise((res) => {
    //     requestResolve = res;
    // });
    // return new Promise(async (resolve, reject) => {
    //     try {
    //         this.activeRequests[requestID] = requestPromise;
    //         let response = await global.proteusTLSMiddleware.request(requestConfig);
    //         resolve(response);
    //         requestResolve();
    //         delete this.activeRequests[requestID];
    //     } catch (e) {
    //         requestResolve();
    //         delete this.activeRequests[requestID];
    //         console.log(e)
    //         this.updateStatus(`Request Client Error: ${e}`);
    //         reject(-1);
    //     };
    // });
  }
}
