<template>
    <div class="hello">
        <h4>父组件传递过来的值：</h4>
        <ul>
            <li><span v-text="message"></span></li>
            <li>
                <button @click="sendParentMsg">向父组件传值</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        props: {
            message: {
                type: String,
                default: 'hello'
            }
        },
        methods: {
            sendParentMsg () {
                this.$emit('childMsg', 'a message from child')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

</style>
