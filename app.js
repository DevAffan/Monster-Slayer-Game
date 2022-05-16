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
            return {
                width: this.monsterHealth + '%',
            }
        },
        playerHealthBar() {
            return {
                width: this.playerHealth + '%',
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
        },

        attackPlayer() {
            const damage = getRandomValue(8, 15);
            if (this.playerHealth - damage < 0) {
            this.playerHealth = 0;
            } else {
            this.playerHealth -= damage;
            }
        },

        specialAttack() {
            this.currentRound++;
            this.monsterHealth -= getRandomValue(10, 25);
            this.attackPlayer();
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
        },

        healMonster() {
            const heal = getRandomValue(10, 20);
            if (this.monsterHealth + heal > 100) {
            this.monsterHealth = 100;
            }
            else{
                this.monsterHealth += heal;
            }
        },

        giveUp() {
            this.playerHealth = 0;
        },

        resetGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
        },

    }
});

app.mount('#game');