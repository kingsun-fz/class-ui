// 存储全局的actions事件
// import {UPDATE_SCHDULE} from 'mutation-type'

export const UPDATE_SCHDULE = ({commit, state}, info) => {
    // 模仿异步提交
    console.log(state.schedule.info)
    setTimeout(function () {
        commit('UPDATE_SCHDULE', info)
    }, 1000)
}

