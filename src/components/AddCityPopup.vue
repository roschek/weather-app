<template>
    <div >
        <form class="form" @submit.prevent="addCity">
            <button class="button__close"
                    @click="closePopup">
                <img :src="require('../assets/cross.png')" alt="close button" class="button__icon">
            </button>
            <h3>Add city</h3>
            <input
                    type="text"
                    placeholder="city name"
                    class="form__input-city"
                    v-model.trim="$v.currentCity.$model"
                    @keydown.enter.prevent="addCity">
            <p class="form__error" v-if="!$v.currentCity.required">City name is required</p>
            <p class="form__error" v-if="!$v.currentCity.alpha">City name should be in english</p>
            <button
                    type="submit"
                    class="button__submit"
                    :disabled="submitStatus === 'PENDING'"
                    >Submit</button>
            <button

                    class="button__submit"
                    @click="cancelFetch"
            >Cansel</button>
        </form>

    </div>
</template>

<script>
    import {required, alpha} from 'vuelidate/lib/validators';
    export default {
        name:'add-city-popup',
        data() {
            return {
                currentCity:'',
                submitStatus: null
            }
        },
        validations () {
            return { currentCity: { required, alpha } }
        },
        methods: {
            cancelFetch() {
                this.currentCity = ''
            },
            closePopup() {
                this.$emit('closePopup')
            },
            addCity() {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING'
                    this.$emit('addCity', this.currentCity)
                    this.currentCity = ''
                    this.closePopup()
                }
            }

        }
    }
</script>

<style scoped>

.form {
    display: flex;
    flex-direction: column;
    padding: 40px;
    background-color: white;
    margin: 200px auto;
    max-width: 400px;
}
.button__close {
    border: none;
    background: transparent;
    max-width: 30px;
    align-self: flex-end;
    cursor: pointer;

}
.button__icon{
    width: 30px;
}
.button__submit {
    border: none;
    cursor: pointer;
    border-radius: 6px;
    margin-top: 10px;
    background-color: #9B51E0;
    color: white;
    padding: 10px 20px;
    max-width: 150px;
}
.form__input-city{
    border: none;
    border-bottom: 1px solid grey;
    padding: 15px;
}
.form__error {
    color: red;
    font-size: 14px;
}
</style>
