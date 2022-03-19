<template>
    <h2>{{customTitle}}</h2>
    <p data-test-id="counter">{{counter}}</p>
    <p>{{counter}}<sup>2</sup>= {{squareCounter}}</p> 

    <div>
        <button id="btn-increase" @click="increase()">+1</button>
        <button id="btn-decrease" @click="decrease()">-1</button>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            start: {
                type: Number,
                default: 100,
                validator(value){
                    return value > 100
                }
            },
        },
        data() {
            return {
                counter: this.start
            }
        },
        methods: {
            getSquareValue(){
                return this.counter * this.counter
            },
            increase() {
                this.counter++
            },
            decrease(){
                 this.counter++
            },
        },
        computed:{
            squareCounter() {
                return this.counter * this.counter
            },
            customTitle(){
                return this.title || 'Counter'
            }
        }
    }
</script>

<style>

    button {
        background-color: rgb(36, 182, 133); 
        border-radius: 5px;
        border: 1px solid white;
        color: white;
        margin: 0 5px;
        padding: 5px 15px;
        transition: 0.3s ease-in-out;
    }

    button:hover {
        background-color: rgb(20, 139, 100);
        transition: 0.3s ease-in-out;
    }

</style>