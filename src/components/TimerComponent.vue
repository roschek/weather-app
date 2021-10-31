<template>
    <div>
        <p class="card-list__timer">{{timeAgo}}</p>
    </div>
</template>

<script>
    import moment from "moment"
    export default {
        props:{'timerstamp':Object},
        data() {
            return {
                timeAgo:''
            }
        },
        created() {
            setInterval(() => {
                this.timeAgo = moment(this.timerstamp).fromNow()
            }, 1000)
        }

    }
</script>

<style scoped>
    .card-list__timer{
        margin-top: 8px;
        color: #A8A8A8;
        font-size: 16px;
        align-self: flex-end;
    }
</style>
