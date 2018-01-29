<template>
    <div class="hello">
        <h3>1. Help page:</h3>
        <ul>
            <!--:与@分别是  v-bind绑定值和v-on绑定事件的缩写-->
            <li><a class="link" :href="bUrl" target="_blank">访问bing</a></li>
            <li><button @click="getUserInfo">获取个人信息</button></li>
            <li>改变firstName: <input @change="changeUserInfo"/></li>
            <li>改变parentMsg: <input @change="changeParentMsg"/></li>
            <li>跳转到test: <button @click="jumpTest">jump</button></li>
        </ul>

        <h3>2. Help page component hello:</h3>
        <!--父组件向子组件传值通过v-bind || 子组件向父组件传值通过v-on-->
        <hello :message="parentMsg" @childMsg="getChildMsg"></hello>

        <h3>3. Vuex test:</h3>
        <ul>
            <li>改变state:<input @change="changeData"/></li>
            <li>
                state: <span v-text="schedule.info"></span>
            </li>
            <li>
                getter: <span v-text="getNewSchedule"></span>
            </li>
        </ul>

        <h3>4. ajax</h3>
        <ul class="ajax">
            <li><button @click="getTaskList">获取task信息</button></li>
        </ul>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this page only -->
<!--<style scoped languge='scss'>-->
<style scoped>
    .link {
        display: block;
        font-size: 20px;
        width: 100px;
    }
    button {
        display: block;
        width: 100px;
    }
    li {
        margin-top: 30px;
    }
</style>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import components from 'components'
    import http from '../api/http'

    /*
        1.watch擅长处理的场景：一个数据影响多个数据
        2.computed擅长处理的场景：一个数据受多个数据影响
    */
    export default {
        name: 'help',
        data () {
            return {
                bUrl: 'https://www.bing.com',
                address: 'shenzhen',
                firstName: 'reamd',
                lastName: 'meng',
                age: 18,
                parentMsg: 'a message from parent'
            }
        },
        created () {
            // 数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
            console.log('created event trigger: ', this.age)
        },
        mounted () {
            // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
            console.log('mounted event trigger: ', this.$el.querySelector('.link'))
        },
        computed: {
            ...mapState([
                'schedule'
            ]),
            ...mapGetters([
                'getNewSchedule'
            ]),
            fullName () {
                return `${this.firstName} ${this.lastName}`
            }
        },
        components: {
            Hello: components.Hello
        },
        methods: {
            ...mapActions([
                'UPDATE_SCHDULE'
            ]),
            changeData (e) {
                let val = e.target.value
                this.UPDATE_SCHDULE(val)
            },
            getUserInfo () {
                window.alert(`${this.firstName}'s age is ${this.age}`)
                console.log(`${this.firstName}'s fullName is ${this.fullName}`)
            },
            changeUserInfo (e) {
                let newName = e.target.value
                console.log(newName)
                this.firstName = newName
            },
            changeParentMsg (e) {
                this.parentMsg = e.target.value
            },
            getChildMsg (msg) {
                console.log('子组件的传过来的值: ', msg)
            },
            jumpTest () {
                this.$router.push({
                    path: 'test'
                })
            },
            getTaskList () {
                http.get('http://localhost:3000/GetClassTaskList', {
                    taskId: '123'
                })
                .then((res) => {
                    console.log(res.body)
                }, (err) => {
                    console.log(err)
                })
            }
        },
        watch: {
            firstName () {
                this.name2address = `${this.firstName} ${this.address}`
                console.log('watch firstName', this.name2address)
            }
        }
    }
</script>
