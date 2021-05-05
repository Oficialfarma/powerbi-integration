const axios = {
    get: jest.fn().mockImplementation(() => {
        return new Promise(async (resolve, reject) => {
            await setTimeout(() => {
                resolve({data: "promise has resolved"});
            }, 500)
        })
    }),
    create: () => axios
}

module.exports = axios;