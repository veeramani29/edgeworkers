# edgeworkers
Edge workers nothing but during the request and response will write logical and achieve whatever we want by JavaScript Code.

On Request		On Response
onClientRequest		onClientResponse
onOriginRequest		onOriginResponse
			responseProvider 
EdgeKV is kind of another database where we can put /save our data by KEY and VALUE.

> # The example
## 1.DeviceLimit check

### Business Use Case
* We are allowing end users to login by n-number of devices. If user account / credentials reached n-number of IP address or devices we are blocking them.

* Every login the device information captured on our end against users. By back end cron job every 15 minutes once will identify the users who has  reached n-number of devices those user information will be moved to edgeKV. 

* When they try to login from another device will throw this error and logout from all the devices. So users need to reach out CRM team then, will identify whether user is normal or any kind of bot or hack. 

* So after resolve problem will give option to remove any devices from their devices and they can login.

### Impact 
* This we can do it in by BE also but to avoid unnecessary request to origin server we decided to use Edgeworkers and EdgeKV with in DNS provider.

* We are trying to get more subscriptions by this device management 


## 2.Server Version Disculsure

### Business Use Case
* We could not able to disclose our origin server version from the elastic beanstalk .So we decided to disclose the server version from the Akamai edge Workers .

### Impact 
* Due to this we can avoid any attack on the server.



 
