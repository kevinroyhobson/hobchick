$(function(){

    $('#name-input').focus();

    $('#rsvp-form').submit(function(event) {

        event.preventDefault();

        var shouldSubmitForm = validateInput();

        if (shouldSubmitForm) {

            var formData = $('#rsvp-form').serialize();

            $.ajax({

                type: 'post',
                url: '/rsvp/',
                data: formData,
                success: function(response) {
                    alert('cool.');
                }

            });
        }

    });

});

function validateInput() {

    var shouldSubmitForm = true;
    var name = $('#name-input').val().trim();
    var isComingIsChecked = ($("input[name='isComing']:checked").length > 0);
    var isTakingBusIsChecked = ($("input[name='isTakingTheBus']:checked").length > 0);

    if (name.length == 0) {
        $('.name-prompt').addClass('error');
        shouldSubmitForm = false;
    }
    else {
        $('.name-prompt').removeClass('error');
    }

    if (!isComingIsChecked) {
        $('.is-coming-question').addClass('error');
        shouldSubmitForm = false;
    }
    else {
        $('.is-coming-question').removeClass('error');
    }

    if (!isTakingBusIsChecked) {
        $('.bus-question').addClass('error');
        shouldSubmitForm = false;
    }
    else {
        $('.bus-question').removeClass('error');
    }

    return shouldSubmitForm;
}