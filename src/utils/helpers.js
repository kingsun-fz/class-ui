module.exports = {
    /**
     * 获取url的query中的某个字段
     * @returns {{}}
     */
    getQuery (name) {
        let reg = new RegExp("(?:^|&)"+ name +"=([^&]*)(?:&|$)")
        let res = window.location.search.substr(1).match(reg)
        if (res !== null) {
            return decodeURIComponent(res[1])
        }
        return null
    }
}
