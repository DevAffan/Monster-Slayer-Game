function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        }
    },

    watch: {
        playerHealth: function(newValue) {
            if (newValue <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }

            else if (newValue <= 0) {
                this.winner = 'monster';
            }

            else if (this.monsterHealth <= 0) {
                this.winner = 'player';
            }
        }
    },

    computed: {
        monsterHealthBar() {
            if (this.monsterHealth <= 0) {
                return {
                    width: 0,
                }
            }
            else{
                return { width: this.monsterHealth + '%',
                }
            }
        },
        playerHealthBar() {
            if(this.playerHealth <= 0) {
                return {
                    width: 0,
                }
            }
            else{
            return{ width: this.playerHealth + '%',
                }    
            }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
    },

    methods: {
        attackMonster() {
            this.currentRound++;
            const damage = getRandomValue(5, 12);
            if (this.monsterHealth - damage < 0) {
            this.monsterHealth = 0;
            this.attackPlayer();
            } else {
                this.monsterHealth -= damage;
                this.attackPlayer();
            }
            this.addLogMesssages('player', 'hit the monster for ', damage + ' damage.');

        },

        attackPlayer() {
            const damage = getRandomValue(8, 15);
            if (this.playerHealth - damage < 0) {
            this.playerHealth = 0;
            } else {
            this.playerHealth -= damage;
            }
            this.addLogMesssages('monster', 'hit the player for ', damage + ' damage.');
        },

        specialAttack() {
            this.currentRound++;
            const damage = getRandomValue(10, 25);
            this.monsterHealth -= damage;
            this.attackPlayer();
            this.addLogMesssages('player', 'use Special attack of ', damage + ' damage.');

        },

        healPlayer() {
            this.currentRound++;
            const heal = getRandomValue(10, 20);
            if (this.playerHealth + heal > 100) {
            this.playerHealth = 100;
            this.attackPlayer() ;
            }
            else{
                this.playerHealth += heal;
                this.attackPlayer() ;
            }
            this.addLogMesssages('player', 'heal for ', heal);
        },

        healMonster() {
            const heal = getRandomValue(10, 20);
            if (this.monsterHealth + heal > 100) {
            this.monsterHealth = 100;
            }
            else{
                this.monsterHealth += heal;
            }
            this.addLogMesssages('monster', 'heal for ', heal);
        },

        giveUp() {
            this.playerHealth = 0;
            this.winner = 'monster';
        },

        startnew() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound= 0;
            this.logMessages= [];

        },
        addLogMesssages(who , what , value) {
            this.logMessages.push({
                 actionBy: who,
                 actionType: what,
                 actionValue: value,
            });
        },

    }
});

app.mount('#game');