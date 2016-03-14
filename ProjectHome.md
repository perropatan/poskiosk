# POS Kiosk #

Project contains set of JavaPOS drivers for common kiosk devices.
The main goal is devepment of free POS self-service kiosk software based on HTML5 and Java technologies. Many manufacturers support JavaPOS specification, but in real cases we did not find any Java drivers for some devices. So we decied to develop such drivers based on manufacturer protocol specifications.

## Package ##

The package consists of the following projects:

  * **poskiosk** - J2EE application is started in Tomcat or GlassFish. Management program includes a JavaScript kiosk modules, monitoring and payments order.
  * **jposapplet** - Java applet provides access to use JavaPOS drivers from JavaScript environment
  * **simulatorjpos** - A set of service-simulation for different devices
  * **ccjavapos** - CashCode bill acceptor device driver
  * **ict3k5jpos** - ICT 3K5 card reader device driver
  * **jcmjavapos** - JCM bill acceptor device driver
  * **overjpos** - Over PINPad deveice driver
  * **puloonjpos** - Puloon bill dispenser device driver
  * **szztjpos** - SZZT PINPad device driver
  * **upsjpos** - IPPON UPS device driver

## Front-end Architecture ##

In the figure below the basic building blocks of the client application kiosk.

  * <font color='maroon'><b>Maroon</b></font> - highlighted in Java-Library.
  * <font color='blue'><b>Blue</b></font> - program for JavaScript.
  * <font color='green'><b>Green</b></font> - visuals files HTML, CSS and images.

![https://poskiosk.googlecode.com/svn/wiki/devguide-front-end.png](https://poskiosk.googlecode.com/svn/wiki/devguide-front-end.png)

Most items loaded on the terminal on the network and are located in _poskiosk\web_. Exception in order to optimize the boot can be Java libraries and drivers. Design elements are described in detail below.

## Location module ##

|_Modul_|_Raspolozhenie_|_Opisanie_|
|:------|:--------------|:---------|
|**Start page**|_index.jsp_    |Home, download main.js|
|**Main loader**|_scripts/main.js_|Application Configuration|
|**Script libraries**|_scripts/lib/-_|Used JavaScript-library|
|**Application**|_scripts/app.js_|General variables and application events|
|**Routers**|_scripts/routers/-_|Controllers application states|
|**Devices**|_scripts/devices/-_|Device controllers kiosk|
|**Models**|_scripts/models/-_|Models and data collection applications|
|**Views**|_scripts/views/-_|Views to display the|
|**Locales**|_scripts/nls/-_|Multilingual and national forms|
|**JavaPOS Applet**|_appet/jposapplet.jar_|JavaPOS coupling agent representation in JavaScript|
|**JavaPOS library**|_**% jre7%**/lib/ext/-_|Communication Controller Driver JavaPOS|
|**Device drivers**|_**% jre7%**/lib/ext/-_|Java-stall device drivers|
|**Template**|_templates_    |HTML templates screens|
|**Styles**|_styles_       |CSS styles of screens|
|**Images**|_images_       |Graphic images|