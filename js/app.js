const parseAppId = '1234'
const parseRestKey = '4321'
const apiBase = 'http://localhost:1337/parse'


$(document).ready( () => {

    getMessages();

    $('#send').click( function() {
        const $sendButton = $(this)
        $sendButton.html('<img src="img/spinner.gif" width="20">')
        const username = $('input[name=username]').val();
        const message = $('input[name=message]').val();

        $.ajax({
            url: `${apiBase}/classes/MessageBoard`,
            headers: {
                'X-Parse-Application-Id': parseAppId,
                'X-Parse-REST-API-Key': parseRestKey
            },
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            data: JSON.stringify({
                'username': username,
                'message': message
            }),
            type: 'POST',
            success: function() {
                console.log('Wysłano ok!')
                getMessages()
                $sendButton.html('Wyślij')
            },
            error: function() {
                console.log('Błądzik...')
                $sendButton.html('Wyślij')
            }
        })
    })
})

const getMessages = () => {
    $.ajax({
        url: `${apiBase}/classes/MessageBoard?limit=1000`,
        headers: {
            'X-Parse-Application-Id': parseAppId,
            'X-Parse-REST-API-Key': parseRestKey
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: (data) => {
            console.log('Pobrano')
            updateView(data)
        },
        error: () => {
            console.log('Błąd!')
        }

    })
}

const updateView = (messages) => {
    const table = $('.table tbody')
    table.html('')

    $.each(messages.results, (index, value) => {
        const trEl = ( `<tr>
            <td>${value.username}</td>
            <td>${value.message}</td>
        </tr>`)
        table.append(trEl)
    })

}