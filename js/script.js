    Vue.component('answer', {
	    props: ['index', 'answer'],

        data() {
	        return {
	            show : false,
            }
        },

        computed : {
	        offset : function() {
	            if (this.index % 2 === 0) {
	                return true;
                }
            }
        },
		template : 
		`
			<div class="col-lg-5 boxes" :class="{ 'col-lg-offset-2' : offset} ">
			    <p v-if="!show" id="key">{{ index }}</p>
				<p v-else id="value">{{ answer }}</p>
			</div>
		`


	});

    Vue.component('x', {
       template : `
                <img class="x zoomAway" src="./images/x.png" width="50" height="50">

       `
    });

	var display = new Vue({
		el : '#root',

		data : {
		    currentQuestion : 0,
            currentWrong : 0,
            input : '',
            showX : [],
            round : [
                {
                    question: 'Name a sport that does not use a ball',
                    answers: ['Hockey', 'Swimming', 'Running/Track', 'Boxing', 'Wrestling', 
                    'Gymnastics', 'Badminton']
                },
                {
                    question : 'Name a word most people yell at their dogs',
                    answers : ['No', 'Sit', 'Stop', 'Down', 'Fetch', 'Bad']
                },              

                {
                    question : 'What did God create in each day of the days of creation',
                    answers : ['Night and Day', 'Sky and Sea','Land and Vegetation', 'Starts, Sun and Moon', 'Fish and Birds', 'Animals and Mankind']
                },
                {
                    question: 'Name Something You Should Not Do When A Cop Pulls You Over',
                    answers: ['Drive Away', 'Talk back', 'Swear', 'Get out of the car', 'Laugh', 'Cry', 'Lie']
                },
                {
                    question: 'Name something huge that you hope does not break while you are riding it',
                    answers: ['Car', 'Elevator', 'Plane', 'Roller Coaster', 'Bicycle', 'Train/Metro']
                },
                {
                    question: 'Name Something A Kid In High School Could Do That Would Get Him Labeled As A "Nerd"',
                    answers: ['Wears Glasses', 'Dress Funny', 'Bad at sports', 'Smart', 'Study too Much', 'Pocket protector', 'Plays Chess']
                },
                {
                    question: 'What is the first thing you notice when meeting someone new',
                    answers : ['Hair', 'Smile', 'Eyes', 'Height', 'Nose', 'Clothes', 'Shoes']
                },
            ]
        },

        methods : {
		    nextQuestion : function() {
		        this.currentQuestion++;
		        for ( var i = 0; i < this.$children.length; i++ ) {
		            this.$children[i].show = false;
                }
            },

            soundCorrect : function(event) {
		        this.$refs.correct.play();
            },

            soundWrong : function(event) {
		        this.$refs.wrong.play();
		        this.showX.push(true);
            },

            soundWinner : function(event) {
		        this.$refs.winner.play();
            }
        },

        watch : {
		    input : function(event) {
		        var number = parseInt(this.input);
                if (Number.isInteger(number) && number != 9 && number != 0) {
                    this.soundCorrect();
                    var index = number - 1;
                    this.$children[index].show = true;
                }
                else if (this.input === 'x') {
                    this.soundWrong();
                } else if (this.input === 'm') {
                    this.soundWinner();
                } else if (this.input === '0') {
                    this.showX = [];
                }

                this.input = '';

            }
        }
	});