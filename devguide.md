# POS Kiosk Development guide #

## Contents ##



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

You must have installed JDK 1.7.0, NetBeans 7.2+ and runtime Tomcat or GlassFish. Trace application in the browser to be used on the kiosk.

Next, the description will be used the following ways

  * _**%Jdk7%**_ - the path to the JDK, for example _C:\Program Files\Java\jdk1.7.0\_17_. JDK used to compile the application for debugging Tomcat.
  * _**%Jre7%**_ - the path to the Java Runtime, such as _C:\Program Files\Java\jre7._ Usually it is installed separately and use a browser to run Java applet.
  * _**%Home%**_ - the root of the browser, such as _C:\Program Files\Google\Chrome\Application\26.0.1410.43_ for Google Chrome or _C:\Program Files\Internet Explorer_ for Internet Explorer.

In the first stage copy the contents of the package.

  1. Copy all of the projects in the package home directory NetBeansProjects.
  1. Copy of the folder _poskiosk\lib_ file **jpos113.jar** to the directory _**% jdk7%**\jre\lib\ext_.
  1. Copy of the folder _poskiosk\lib_ files **jpos113.jar**, **xercesImpl.jar**, **xml-apis.jar** to the directory _**%jre7%**\lib\ext_.
  1. Build project **simulatorjpos** and copy the jar-file from a directory _simulatorjpos\dist_ to the directory _**%jre7%**\lib\ext_.
  1. Similar to build and copy to _**%jre7%**\lib\ext_ JavaPOS driver other used devices.
  1. Copy the files from the directory _lib_ **jpos.properties** and **jpos.xml** to the directory _**%home%**_. Set in **jpos.properties** required level of logging. Initial settings **jpos.xml** describe simulators JavaPOS services from package **simulatorjpos**, for actual devices need to be changed.

Now you need to configure the runtime Java-applet for JposApplet.

  1. Create a set of keys to sign the application **jposapplet**, the command ```
%jdk7%\bin\keytool -genkeypair -keystore jposapplet\jpos.keystore -alias poskiosk -storepass password -keypass password```. For this first meeting yu can skip step and use the existing key **jposapplet\jpos.keystore**, but strongly suggest you return to this step before the publication of the application into production.
  1. Export the certificate key team ```
%jdk7%\bin\keytool -exportcert -keystore jposapplet\jpos.keystore -alias poskiosk -storepass password -keypass password -file jposapplet\poskiosk.crt```
  1. Import the certificate **jposapplet\poskiosk.crt** in the Trusted Root Certification Authorities, which are used by the browser.
  1. Import the certificate **jposapplet\poskiosk.crt** in the Trusted Root Certification Java Runtime. To do this, use ```
%jdk%\bin\keytool -importcert -keystore %jre%\lib\security\cacerts -file jposapplet\poskiosk.crt -storepass changeit -alias poskiosk``` Note: The command must be run as administrator.
  1. Add to java.policy file the following lines:
> ```

keystore "cacerts", "jks";
grant {
permission java.util.PropertyPermission "*", "read, write", signedBy "poskiosk";
permission java.io.FilePermission "<<ALL FILES>>", "read", signedBy "poskiosk";
permission java.net.SocketPermission "[0:0:0:0:0:0:0:1]:*", "accept, resolve", signedBy "poskiosk";
permission java.lang.RuntimePermission "modifyThreadGroup", signedBy "poskiosk";
permission java.lang.RuntimePermission "modifyThread", signedBy "poskiosk";
};
```
> or just copy the file from the directory _lib_ **java.policy** to the directory _**%jre7%**\lib\security_.

Setting the main project **poskiosk**.

  1. Build project **jposapplet**, verify successful installation of the signature on behalf of **poskiosk** and copy the jar-file from a directory _jposapplet\dist_ to the directory _poskiosk\web\applet_.
  1. Update the project properties **poskiosk** information about your J2EE server, Tomcat, GlassFish and Google AppEngine.

You are now ready to build and run the project **poskiosk**.

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