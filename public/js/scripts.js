var setStep;

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

var checkAll = function() {
    var mail = true,
        filled = true,
        name = true,
        pass = true;

    $('.inputs input').each(function(){

    if($(this).val() === '') {
        errorHandler($(this), false, 'Please fill in this information.');
        filled = false;
    }else if(this.id == 'user_mail' && !$(this).val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        errorHandler($(this), false, 'Please enter a valid email.');
        mail = false;
    }else if(this.id == 'user_name' && $(this).val().length < 4) {
        errorHandler($(this), false, 'Username must be at least 4 characters long.');
        name = false;
    }else if(this.id == 'user_pass' && !passChecker()) {
        pass = false;
    }else {
        errorHandler($(this), true);
    }

    });

    if(mail && filled && name && pass) {
        return true;
    }else {
        return false;
    }
}

var handleSteps = function() {
    var $submitBtn = $('#signup_btn'),
        $termsBtn = $('.btn.check'),
        $cont = $('#continue'),
        $done = $('#done'),
        $loader = $('.loader'),
        $step1 = $('.step1'),
        $step2 = $('.step2'),
        $step3 = $('.step3'),
        $step4 = $('.step4');

        switch (parseInt(get())) {
            case 2:
                $step1.hide();
                $step3.hide();
                $step4.hide();
                $step2.show();
                break;
            case 3:
            console.log('dasdasd');
                $step1.hide();
                $step2.hide();
                $step3.hide();
                $step3.show();
                break;
            case 4:
                $step1.hide();
                $step2.hide();
                $step3.hide();
                $step4.show();
                break;
            default:
                $step2.hide();
                $step3.hide();
                $step4.hide();
                $step1.show();
        }


    $termsBtn.on('click', function() {

        if($submitBtn.hasClass('greyout')) {
            $submitBtn.removeClass('greyout');
        }else {
            $submitBtn.addClass('greyout');
        }

    });

    $submitBtn.on('click', function() {

        if($(this).hasClass('greyout')) {
            $termsBtn.addClass('pulse')
            setTimeout(function(){$termsBtn.removeClass('pulse');}, 300)
            return false;
        }

        if(checkAll()) {
            console.log('Success!')
            $loader.fadeIn();
            setTimeout(function() {
                setStep = 2;
                store();
                console.log(get());
                $loader.fadeOut();
                $step1.hide();
                $step2.fadeIn();
            }, 3000)

        }else {
            console.log('Faliure!');
        }
    });

    $cont.on('click', function() {
        setStep = 3;
        store();
        console.log(get());
        $step2.hide();
        $step3.fadeIn();
    });

    $done.on('click', function() {

        $loader.fadeIn();
        setTimeout(function() {
            setStep = 4;
            store();
            console.log(get());
            $loader.fadeOut();
            $step3.hide();
            $step4.fadeIn();
        }, 3000)

    });

}

var store = function() {
    sessionStorage.setItem('step', setStep);
}

var get = function() {
    return sessionStorage.getItem('step');
}

$(document).ready(function() {
    handleSteps();
});
