$(document).ready(function () {

    // إضافة مادة
    $('#addCourse').click(function () {
        var row = $('.course-row').first().clone();
        row.find('input').val('');

        row.append(
            '<div class="col-auto">' +
            '<button type="button" class="btn btn-danger remove-row">X</button>' +
            '</div>'
        );

        $('#courses').append(row);
    });

    // حذف مادة
    $(document).on('click', '.remove-row', function () {
        if ($('.course-row').length > 1) {
            $(this).closest('.course-row').remove();
        }
    });

    // إرسال الفورم
    $('#gpaForm').submit(function (e) {
        e.preventDefault();

        var valid = true;

        // التحقق من course
        $('[name="course[]"]').each(function () {
            if ($(this).val().trim() === '') {
                valid = false;
            }
        });

        // التحقق من credits
        $('[name="credits[]"]').each(function () {
            if (isNaN($(this).val()) || parseFloat($(this).val()) <= 0) {
                valid = false;
            }
        });

        if (!valid) {
            $('#result').html(
                '<div class="alert alert-warning">Please enter valid values in all fields.</div>'
            );
            return;
        }

        // AJAX
        $.ajax({
            url: 'calculate.php',
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',

            success: function (response) {

                if (response.success) {

                    var alertClass = 'alert-info';

                    if (response.gpa >= 3.7) {
                        alertClass = 'alert-success';
                    } else if (response.gpa >= 3.0) {
                        alertClass = 'alert-info';
                    } else if (response.gpa >= 2.0) {
                        alertClass = 'alert-warning';
                    } else {
                        alertClass = 'alert-danger';
                    }

                    $('#result').html(
                        '<div class="alert ' + alertClass + '">' +
                        response.message +
                        '</div>' +
                        response.tableHtml
                    );

                } else {

                    $('#result').html(
                        '<div class="alert alert-danger">' +
                        response.message +
                        '</div>'
                    );
                }
            },

            error: function () {
                $('#result').html(
                    '<div class="alert alert-danger">Server error occurred.</div>'
                );
            }
        });

    });

});
