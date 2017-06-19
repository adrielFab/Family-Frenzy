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
                /** Sample */

                {
                    question : 'Name a boy name',
                    answers : ['Mark', 'John','Joseph', 'Karl', 'Brian', 'Louie']
                },
                /** Round 1 */
                {
                    question: 'Name something people do while listening to music?',
                    answers: ['Cleaning', 'Exercising', 'Singing', 'Eating', 'Dancing', 'Driving', 'Studying']
                },
                {
                    question: 'Name the first 8 plagues of the plagues of Egypt',
                    answers: ['Water into blood', 'Frogs', 'Gnats/Lice', 'Flies', 'Diseased Livestock',
                    'Boils', 'Thunder / Hail', 'Locust']
                },
                {
                    question: 'Name an animal that we eat that will never eat us',
                    answers: ['Cow', 'Chicken', 'Pig', 'Turkey', 'Lamb']
                },
                {
                    question: 'Name 5 rivers mentioned in the Bible',
                    answers : ['Nile', 'Tigris', 'Euphrates', 'Pishon', 'Gihon']
                },
                {
                    question: 'Name a part of you body that looks different when you\'re sick',
                    answers: ['Skin', 'Eyes', 'Nose', 'Hair']
                },

                /** Round 2 */
                {
                    question: 'Name a sport that does not use a ball',
                    answers: ['Hockey', 'Swimming', 'Running/Track', 'Boxing', 'Wrestling', 
                    'Gymnastics', 'Badminton']
                },
                {
                    question: 'Name an animal that is mentioned many times in the Bible',
                    answers: ['Sheep', 'Lamb', 'Lion', 'Ox', 'Ram', 'Horse']
                },
                {
                    question: 'Name an occasion where people give away flowers',
                    answers: ['Valentine\'s day', 'Birthday', 'Funeral', 'Mother\'s day', 'Anniversary']
                },
                {
                    question: 'Name 5 names mentioned in Jesus\'s genealogy',
                    answers: ['Abraham', 'Jesse', 'David', 'Jacob', 'Joseph']
                },
                {
                    question : 'Name something parents tell their kids not to waste',
                    answers : ['Food', 'Money', 'Water', 'Electricity', 'Time']
                },

                /** Losers */
                {
                    question: 'Name something people do when they are sick',
                    answers : ['Take a nap', 'Throw up', 'Take medicine', 'Eat soup', 'Drink water', 'Go to the doctor']
                },
                {
                    question: 'Name the 5 major prophetic books of the Bible',
                    answers: ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel']
                },
                {
                    question: 'Name a tiny creature that frightens people',
                    answers: ['Spider', 'Mouse/Rat', 'Snake', 'Cockroach', 'Bee']
                },
                {
                    question: 'Name a famous Bible trio',
                    answers: ['Trinity', 'Abraham, Isaac, Jacob', 'Shadrach, Meshach, Abednego',
                     'Peter, James and John', 'Hem, Shem, Japheth']
                },
                {
                    question: 'Name a fruit with lots of seeds',
                    answers: ['Watermelon', 'Pomegranate', 'Kiwi', 'Cantaloupe', 'Papaya']
                },

                /** Winners */
                {
                    question: 'Name an instrument that is too big to carry on an airplane',
                    answers: ['Tuba', 'Piano', 'Cello', 'Harp', 'Drums', 'Saxophone', 'Trombone']
                },
                {
                    question: 'Name 5 missionaries mentioned in the Bible',
                    answers: ['Paul', 'Philip', 'Barnabas', 'Apollos', 'Aquilla/Prescilla']
                },
                {
                    question: 'Name something people consider a snack food',
                    answers: ['Chips', 'Popcorn', 'Crackers', 'Fruit', 'Cookies', 'Peanuts/Nuts' ]
                },
                {
                    question: 'Name something you associate with Eve from the Bible',
                    answers: ['Adam', 'Apple/Fruit', 'Snake', 'Sin', 'Garden']
                },
                {
                    question : 'Name something a man had better not take along on his honeymoon',
                    answers : ['Another woman', 'Cellphone', 'His Parents', 'Work/Laptop', 
                    'His Best Friend', 'His Pet']
                }
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