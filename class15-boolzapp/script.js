
// send funcs
function addSendListener() {

    var target = $('#new-message-input');
    target.keyup(sendKeyup);

    var button = $('#sendButton');
    button.click(sendClick);
}

function sendKeyup(event) {

    var key = event.which;
    var input = $(this);
    var txt = input.val();

    if (key === 13 && txt) {

        sendChat(input, txt);
    }
}
function sendClick() {

    var input = $('#new-message-input');
    var txt = input.val();

    if (txt) {

        sendChat(input, txt);
    }
}
function sendChat(input, txt) {

    input.val('');

    sendMessage(txt, 'sent');
    setTimeout(function() { sendMessage('ok', 'received'); }, 1000);
}

function sendMessage(txt, type) {

    var template = $('#template-message > div').clone();
    var target = $('.right-messages.active');

    template.addClass(type);
    template.find('#message-text').text(txt);
    template.find('#message-time').text(getActualHour());

    target.append(template);
}

// search funcs
function addSearchListener() {

    var target = $('#contacts-filter');
    target.keyup(searchKeyup);
}

function searchKeyup() {

    var input = $(this);
    var txt = input.val();

    var contacts = $('.contacts .contact');
    contacts.each(function() {

        var contact = $(this);
        var name = contact.find('.contact-name').text();

        // name.indexOf(txt) --> -1 se non trovato; >= 0 altrimenti
        if (name.toLowerCase().includes(txt.toLowerCase())) {

            contact.show();
        } else {

            contact.hide();
        }
    });
}

// contact list funcs
function addContactClickListener() {

    var contacts = $('.contacts .contact');
    contacts.click(contactClick);
}

function contactClick() {

    var clickedContact = $(this);
    var id = clickedContact.data('id');
    var contacts = $('.contacts .contact');

    var conversations = $('.right-messages');
    var selectedConv = $('.right-messages[data-id=' + id + ']');

    contacts.removeClass('active');
    clickedContact.addClass('active');

    conversations.removeClass('active');
    selectedConv.addClass('active');
}

// menu options funcs
function addMessageClickListener() {

    $(document).on('click', '.message-options', messageOptionClick);
}
function messageOptionClick() {

    var messageButton = $(this);
    var messageOption = messageButton.siblings('.message-options-panel');

    messageOption.toggle();
}

function addMessageDestroyListener() {

    $(document).on('click', '.message-destroy', messageDestroyClick);
}
function messageDestroyClick() {

    var destroyOption = $(this);
    var message = destroyOption.parents('.message');
    // var message = destroyOption.closest('.message');

    message.remove();
}

// test funcs
function addTestListener() {

    $(document).on('click', '.message-options', function() {

        console.log('hello');
    });
}

// general funcs
function getActualHour() {

    var date = new Date();
    return date.getHours() + ':' + date.getMinutes();
}

// init funcs
function init() {

    addSendListener();
    addSearchListener();
    addContactClickListener();
    addMessageClickListener();
    addMessageDestroyListener();

    // addTestListener();
}

$(document).ready(init);
