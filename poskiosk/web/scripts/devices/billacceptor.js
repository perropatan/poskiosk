/**
 * Bill Acceptor device
 * 
 * Copyright (c) 2013 POSkiosk Team
 * 
 * @param {Application} app         
 * @param {jpos.applet.JposAppet} jpos        
 * @param {Constants} jposConst   
 * @returns {jpos.applet.BillAcceptor}                      
 * 
 * Changes:
 * 
 * 28.03.2013 Maxim Ryabochkin Project skeleton
 * 
 */
define(['app',
    'applet!applet/jposapplet',
    'devices/jposconst'], function(app, jpos, jposConst) {

    var dev = jpos.createDevice('BillAcceptor');

    app.on('afterstart', function() {
//        var s = jpos.traceDeviceOpen('BillAcceptor', 'BillAcceptor');
//        window.console & window.console.log(s);
          dev.open("BillAcceptor");
          dev.claim(0);
          dev.setDeviceEnabled(true);
          dev.setCurrencyCode("RUB");
    });

    app.on('beforestop', function() {
        dev.close();
    });

    return dev;
});