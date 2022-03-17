<template>
    <h1>El juego de la verdad</h1>
    <img v-if="img" :src="img" alt="bg">
    <div class="bg-dark"></div>

    <div class="indecision-container">
        
        <input 
        v-model= "question"
        type="text" 
        placeholder="Hazme una pregunta" >
        <p>Recuerda terminar con un signo de interrogación (?)</p>
    
        <div v-if="isValidQuestion">
            <h2>{{question}}</h2>
            <h1>{{answer }}</h1>
        </div>
    </div>
  
</template>

<script>
    import { watch } from '@vue/runtime-core'
    export default {
        data() {
            return {
                question: null,
                answer: null,
                img: null,
                isValidQuestion: false,
            }
        },
        methods: {
            async getAnswer() {
                this.answer = 'Pensando...'
                const {answer, image} = await fetch('https://yesno.wtf/api').then(resp =>resp.json())
                this.answer = answer === 'yes' ? 'Si!' : 'No'
                this.img = image
            }
        },
        watch: {
            question(value, oldvalue) {

                this.isValidQuestion = false

                if(!value.includes('?')) return

                this.isValidQuestion = true

                this.getAnswer()

            },
        }

    }
    
</script>

<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        margin-top: 100px;
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 350px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 40px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>
