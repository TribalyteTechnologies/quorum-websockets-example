# DEVELOPMENT HELP FOR ALASTRIA'S NETWORK T (QUORUM)

Considering that there is available a regular Telsius node, which can be deployed as indicated <a href="https://medium.com/babel-go2chain/setting-in-motion-a-regular-node-in-the-telsius-network-of-alastria-c2d67b8369c7">here</a> 

### ALLOW WEBSOCKET CONNECTIONS

By default websocket connections are not allowed in the configuration of the geth process. To allow these type of connections we should modifiy our geth process including the correspondent api/flags for websocket connections, also we will have to configure the proxy available, this proxy is the <a href="https://github.com/alastria/alastria-access-point"> Alastria Access Point </a> 

First of all we allow the websocket connections on the geth process. By default only the rpc request are accepted, so we have to add the websocket flags. The executable `start.sh` must be modified, with the next changes. 

Include into the variable `$GLOBAL_ARGS` on line 76 the wesocket flags:

``` "--ws --wsaddr 0.0.0.0 --wsport 22001" ```

With these flags we accept the websocket request and  they are manage with the `port 22001`
We also have to modify the variable `$GLOBAL_ARGS` on lines 124 and 126
``` --wsorigins "test.com" ```
With this change we are allowing the websocket requests where the request comes from the origin "test.com". When we create the websocket connection on the header we have to specified the origin: "test.com"

Here an example of connection establishment via web3:
```
var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://0.0.0.0/ws", {
    headers: {
    Origin: "test.com"
    }
    }));
```

You need to be careful If you try to connect via websocket with web3, due to the knonw issues with the previous versions to v1.0.0-beta.35 . Its recommended to use versions from v1.0.0-beta.36

We save the changes made on start.sh. To make these changes effective we have to stop the geth process and then start it again.

```
$ ./stop.sh
$ ./start.sh
```

Now we are going to configure the proxy access, by modifying the access-point.conf (located on `/etc/nginx/conf.d`). We have to take into account that we alredy assigned the port 22001 to the websockets connections. 

```
map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
upstream websocket {
        server localhost:22001;
    }
```

Inside server add a new location, that will be used by websockets

```
location /ws {
		proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
		proxy_pass http://localhost:22001;
	}
```

Save the changes made and reload the proxy configuration by

```
$ nginx -s reload
```

Thats all, now you are able to make websocket connections to your regular node.
