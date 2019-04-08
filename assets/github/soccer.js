$(document).ready(function() {
    
        $('#timer').hide();
        $('.answer').hide();
        $('.results').hide();
    
        function showQuestions(){
            $('#timer').show();
            $('.answer').show();
            $('#finish').show();
        }
        
            function timerTimer(){
                intervalId = setInterval(decrement, 1000);
                }

        function displaySummary(){
            $('.results').show();
            unanswered = (10-(correctValue+incorrectValue));
            $('#correct').text("Correct Answers: " + correctValue); 
            $('#incorrect').text("Wrong Answers: " + incorrectValue);
            $('#unanswered').text("Unanswered:" + " " + unanswered); 
        }
        
        var number = 75; 
        var intervalId;
        var correctValue = 0;
        var incorrectValue = 0;
        var unanswered = 0;
    
        function stop() {
            clearInterval(intervalId);
        }
    
        function hide(){
            $('#timer').hide();
            $('.answer').hide();
            $('#finish').hide();
        }
        
        $('input[type=radio]').on ('change', function(){
            correctValue = $('input[value=correct]:checked').length;
            incorrectValue = $('input[value=wrong]:checked').length;
            unanswered = (10-(correctValue+incorrectValue));
            });

        $('#begin').on('click', function(){
            $('#begin').hide();
            showQuestions();
            timerTimer();
        }); 

        function decrement(){
            number--;
            $('#timer').html(" " + number + " " + "seconds");
            if (number ===1){
                $('#timer').html(" " + number + " " + "second");
            }
            else if(number ===0) {
                stop();
                hide();
                displaySummary();
            }
        }

        $('#finish').on('click', function(){
            $('#begin').hide(); 
            hide();
            displaySummary();
        });
    });