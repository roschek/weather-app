<template>
    <ul class="card-list">
        <li class="card-list__item"
            v-for="city in cities"
            :key="city.name">
            <h2 class="card-list__title">{{city.name}}</h2>
            <p class="card-list__subtitle">{{city.country}}</p>
            <div class="card-list__element">
                <p class="card-list__text">Weather</p>
                <p class="card-list__text">{{city.weather}}</p>
            </div>
            <div class="card-list__element">
                <p class="card-list__text">Temperature</p>
                <p class="card-list__text">{{city.temperature}}&deg;C</p>
            </div>
            <div class="card-list__element">
                <p class="card-list__text">Humidity</p>
                <p class="card-list__text">{{city.humidity}}%</p>
            </div>
            <timer-stamp :timerstamp="city.timestamp"></timer-stamp>
            <div class="button-wrapper">
                <button
                        class="button"
                        @click.stop="handleRemove(city)"
                >remove</button>
                <button
                        class="button"
                        @click.stop="reloadCity(city.name)"
                >reload</button>
            </div>
        </li>
    </ul>
</template>

<script>
    import TimerComponent from "./TimerComponent";
    export default {
        name:'city-list',
        components: {
            'timer-stamp': TimerComponent
        },
        props: {
            cities: {Array}
        },
        methods: {
            handleRemove(city) {
                this.$emit('handleRemove', city)
            },
            reloadCity(name) {
                this.$emit('reloadCity', name)
            },
        },
    }
</script>

<style scoped>
    .card-list {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0 auto;
        justify-content: flex-start;
        max-width: 90%;
    }
    .card-list__item {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        max-width: 350px;
        border-radius: 6px;
        margin-bottom: 20px;
        margin-right: 30px;
    }
    .card-list__element {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #C4C4C4;
    }
    .card-list__title{
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
    }
    .card-list__subtitle{
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
    }
    .card-list__text{
        font-weight: normal;
        font-size: 18px;
    }
    .button-wrapper{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 32px;
    }
    .card-list__timer{
        margin-top: 8px;
        color: #A8A8A8;
        font-size: 16px;
        align-self: flex-end;
    }
    .button{
        border: none;
        cursor: pointer;
        color: #9B51E0;
        text-transform: uppercase;
        background-color: white;
        font-weight: bold;
    }
</style>
