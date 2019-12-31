/* 

    Monster Slayer Logic Implemented with Vue js

*/

new Vue({

    /* Root Application */

    el: "#app",

    /* Application state */

    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
        specialAttackCount: 0,
        healCount: 0,
        feedBack: '',
        statusClass: ''
    },

    /* Application Functions */

    methods: {

        /* Reset State */

        startGame : function(){

            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = true;
            this.turns = [];
            this.specialAttackCount = 0;
            this.healCount = 0;
            this.feedBack = '';
            this.statusClass = '';

        },

        /* Attack click event Handler */

        attack: function(){

            var damage = this.calculateDamage(3, 10);

            this.monsterHealth -= damage;

            this.turns.unshift({

                isPlayer: true,

                text: "Player hits Monster for " + damage

            });

            if (this.checkWin()){

                return;
            }

            this.monsterAttacks();
        },

        /* Hard Attack click event Handler */

        specialAttack: function(){

            this.specialAttackCount++;

            var damage = this.calculateDamage(10, 20);

            this.monsterHealth -= damage;

            this.turns.unshift({

                isPlayer: true,

                text: "Player hits Monster hard for " + damage

            });

            if (this.checkWin()){

                return;
            }

            this.monsterAttacks();
            
        },

        /* Heal click event Handler */

        heal: function(){

            this.healCount++;

            if (this.playerHealth <= 85){

                this.playerHealth += 15;
            }
            else{

                this.playerHealth = 100;
            }

            this.turns.unshift({

                isPlayer: true,

                text: "Player heals for 15"

            });

            this.monsterAttacks();
            
        },

        /* Give up click event Handler */

        giveUp: function(){

            this.gameIsRunning = false;
            
        },
        
        /* Moster attack damage Handler */

        monsterAttacks: function(){

            var damage= this.calculateDamage(5, 15);

            this.playerHealth -= damage;

            this.turns.unshift({

                isPlayer: false,

                text: "Monster hits Player for " + damage

            });

            this.checkWin();

        },

        /* Random Damage Value */

        calculateDamage: function(min, max){

            return Math.max(Math.floor(Math.random() * max) + 1, min );
        },

        /* Monitor progress */

        checkWin: function(){

            if (this.monsterHealth <= 0){

                this.endGame("won", "Hurray !!! You won....");

                return true;
            }
            else if (this.playerHealth <= 0){

                this.endGame("lose", "Oops !!! You Lost..");

                return true;
            }

            return false;
        },

        /* End Game Handler */

        endGame: function(status, txt){

            this.statusClass = status;

            this.feedBack = txt;

            this.gameIsRunning = false
            

        }
    }
})