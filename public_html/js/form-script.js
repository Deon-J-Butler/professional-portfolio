$(document).ready(function() {
    $('#contact-form').validate({
        debug: true,
        errorClass: 'alert alert-danger',
        ErrorLabelContainer: '#output-area',
        errorElement: 'div',
        // rules for form input
        rules: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            email: {
                email: true,
                required: true
            },
            message: {
                required: true,
                maxlength: 1500
            }
        },
        messages: {
            firstName: {
                required: 'Name is required'
            },
            lastName: {
                required: 'Name is required'
            },
            email: {
                email: 'Please enter a valid email',
                required: 'Email is required'
            },
            message: {
                required: 'Message body is required',
                maxlength: 'Message must be no longer than 1500 characters'
            }
        },
        submitHandler: (form) => {
            $('#contact-form').ajaxSubmit({
                type: 'POST',
                url: $('#contact-form').attr('action'),
                success: (ajaxOutput) => {
                    $('#output-area').css('display', '')
                    $('#output-area').html(ajaxOutput)

                    if($('.alert-success') >= 1) {
                        $('#contact-form')[0].reset
                    }
                }
            })
        }
    })
})