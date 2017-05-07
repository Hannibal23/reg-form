var errorHandler = function(input, status, problem = '') {
    var $input = input,
        $parent = $input.parent(),
        $alert = $parent.next(),
        $errMsg = $('<span class="error-msg">'+ problem +'</span>');

    if(status){
        $parent.removeClass("has-error has-feedback");
        $alert.fadeOut();
    }else {
        $('.error-msg', $alert).remove();
        $alert.append($errMsg).fadeIn();
        $parent.addClass("has-error has-feedback");
    }

};

var passChecker = function() {
    var $pass = $('#user_pass'),
        passVal = $pass.val(),
        guideLines = '<br />* Minimum 6 characters.<br />* Maximum 12 characters.<br />* One capital letter.<br />* One lower-case letter.<br />* One number OR special character.';

    if (passVal.length < 6) {
        errorHandler($pass, false, 'Password too short!' + guideLines);
        return false;
    }
    if (!passVal.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        errorHandler($pass, false, 'Your password must contain at least one capital and one small letter.' + guideLines);
        return false;
    }
    if (!passVal.match(/([!,%,&,@,#,$,^,*,?,_,~])/) && !passVal.match(/([0-9])/)) {
        errorHandler($pass, false, 'Your password must contain at least one number or special character.' + guideLines);
        return false;
    }
    else {
        errorHandler($pass, true);
        return true;
    }

};

var validateInputs = function() {
    var inputs = ['#first_name', '#user_mail', '#user_name', '#user_pass'],
        passed = false;

    $.each(inputs, function(i, val) {
        var $current = $(val);

        if($current.val() == '') {
            errorHandler($current, false, 'Please fill in this information.');
            return;
        }
        if(val === '#user_mail' && !$current.val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            errorHandler($current, false, 'Please enter a valid email.');
            return;
        }
        if(val === '#user_name' && $current.val().length < 4) {
            errorHandler($current, false, 'Username must be at least 4 characters long.');
            return;
        }
        if(val === '#user_pass') {
            if (!passChecker()) {
                return;
            }
        }
        else {
            errorHandler($current, true);
            return passed = true;
        }
    });

};



var submitForm = function() {
    var $submitBtn = $('#signup_btn'),
        $termsBtn = $('.btn.check');

    $termsBtn.on('click', function() {

        if($submitBtn.hasClass('greyout')) {
            $submitBtn.removeClass('greyout');
        }else {
            $submitBtn.addClass('greyout');
        }

    });

    $submitBtn.on('click', function() {

        if($(this).hasClass('greyout')) {
            return false;
        }

        if(validateInputs()) {
            console.log('Success!')
        }else {
            console.log('Faliure!');
        }
    });

}

$(document).ready(function() {

    submitForm();

});
