window.onload = function() {
    function Quiz(questions) {
        this.score = 0;
        this.questions  = questions;
        this.questionsIndex = 0;
    }

    Quiz.prototype.getQuestionIndex = function () {
        return this.questions[this.questionsIndex];
    };


    Quiz.prototype.isEnded = function () {
        return this.questions.length === this.questionsIndex;
    };
    Quiz.prototype.guess = function (answer) {

        if(this.getQuestionIndex().correctAnswer(answer)){
            this.score++;
        }
        this.questionsIndex++;
    }

    function populate() {
        if(quiz.isEnded()){
            showScores();
        }else{
            //show question
            var element = document.getElementById('question');
            element.innerHTML = quiz.getQuestionIndex().text;


            //show choices

            var choices = quiz.getQuestionIndex().choices;
            for(var i = 0; i < choices.length; i++){
                var element = document.getElementById('choice' + i);
                element.innerHTML = choices[i];
                guess("btn"+ i, choices[i]);
            }
            showProgress();
        }
    }
    function guess(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function () {
            quiz.guess(guess);
            populate();
        }
    }



    function showProgress() {
        var currentQuestionNumber = quiz.questionsIndex + 1;
        var element = document.getElementById('progress');
        element.innerHTML = 'Question ' + currentQuestionNumber + ' of ' + quiz.questions.length;
    }

    function showScores() {
        var gameOverHtml = '<span>Result </span>';
        gameOverHtml += '<span id="score">Your scores:'+ quiz.score + '</span>';
        var element =document.getElementById('quiz');
        element.innerHTML = gameOverHtml;
    }




    var questions = [
        new Question("The capital of Ukraine is...?",['Kiev','Paris','London','New York'], 'Kiev'),
        new Question("The capital of France is...?",['Paris','Amsterdam','Budapest','California'], 'Paris'),
        new Question("The capital of Japan is...?",['Hong-Kong','New-Deli','Pekin','Chili'], 'Hong-Kong'),
        new Question("The capital of Spain is...?",['Madrid','Oslo','Kiev','Moscow'], 'Madrid'),
        new Question("The capital of Russia is...?",['Moscow','Almata','Kazan','Omsk'], 'Moscow')
    ];


    var quiz =  new Quiz(questions);

    populate();

    function Question(text, choices, answer) {
        this.text = text;

        this.choices = choices;
        this.answer = answer;
    }


    Question.prototype.correctAnswer = function (choice) {
        return choice === this.answer;
    };

};

