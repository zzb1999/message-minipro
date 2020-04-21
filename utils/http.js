/**
 * 接口封装函数
 * @param {string} url 请求的接口地址，不含前缀
 * @param {string} method 请求类型
 * @param {object} params 请求附加的参数
 */
function http(url,method,params){
    let apiPath = "http://gbook.com/api/v1"
    wx.request({
        url: apiPath + url,
        data: params.data ? params.data : {},
        header: {Accept: 'application/json'},
        method: method == 'POST' ? 'POST' : 'GET',

        success: (res) => {
            params.success && params.success(res.data)
        },

        fail: (err) => {
            params.fail && params.fail(err)
        },

    })
}

module.exports = {
    http
}