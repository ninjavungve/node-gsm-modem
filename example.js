var Modem = require('./');

var modem1 = new Modem({
    port : '/dev/ttyUSB0',
    notify_port : '/dev/ttyUSB1',
    onDisconnect : function (modem) {
        console.log('onDisconnect');
    },
    balance_ussd : '*102*1#',
    dollar_regexp : /(-?\d+)\s*rub/,
    cents_regexp : /(-?\d+)\s*kop/,
    debug : true
});

// where you received the mesage
modem1.on('message', function (sms) {
    console.log('onSMS', sms);
});

// trigger USSD event
modem1.on('USSD', function (ussd) {
    console.log('onUSSD', ussd);
});

modem1.connect(function () {

    modem1.getAllSMS(function (err, sms) {
        console.log('SMSes:', sms);
    });

    modem1.sendSMS({
        receiver : 'ENTER YOUR NUMBER HERE',
        text : 'ENTER YOUR MESSAGE CONTENT HERE!',
        request_status : true
    }, function (err, data) {
        console.log('sendSMS', data);
    });

    modem1.deleteAllSMS (function(err){
        if (err === undefined) {
            console.log ('all messages were deleted');
        } else {
            console.log ('messages were not deleted');
        }
    });

});

