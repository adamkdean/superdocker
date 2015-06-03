# superdocker

Superdocker allows you to manage multiple docker hosts easily. This is not for clusters, this is for working with different environments.

For example, let's say you have three environments that you use:  
- local boot2docker install (`boot2docker`)
- single network docker host (`local`)
- remote swarm cluster (`remote`)

If you wanted to use your local docker client with each of these, you'd have to keep changing your environment variables or pass the host via `-H`. But you don't have to live this way, you can superdocker it.

## Install

Install via npm:

    npm i superdocker -g

## Upgrading

To upgrade all global packages, use this:

    npm outdated -g --depth=0.

Read more: https://docs.npmjs.com/getting-started/updating-global-packages

## Create a config file

You'll need to create a config file in your home directory:

    touch .superdocker

In this, place your configuration:

    [boot2docker]
        DOCKER_CERT_PATH=/Users/adam/.boot2docker/certs/boot2docker-vm
        DOCKER_TLS_VERIFY=1
        DOCKER_HOST=tcp://192.168.59.103:2376

    [local]
        DOCKER_HOST=tcp://192.168.1.100:2375

    [remote]
        DOCKER_HOST=tcp://swarm.yourhost.com:2375


## Check it's working

You can now run `superdocker <configuration> <commands>`, which is the same as `docker <commands>`:

    $ superdocker boot2docker info
    Containers: 12
    Images: 405
    Storage Driver: aufs
     Root Dir: /mnt/sda1/var/lib/docker/aufs
     Backing Filesystem: extfs
     Dirs: 429
     Dirperm1 Supported: true
    Execution Driver: native-0.2
    Kernel Version: 4.0.3-boot2docker
    Operating System: Boot2Docker 1.6.2 (TCL 5.4); master : 4534e65 - Wed May 13 21:24:28 UTC 2015
    CPUs: 8
    Total Memory: 1.957 GiB
    Name: boot2docker
    ID: CDUR:6WLL:EYYH:YQPH:FAB5:FRFY:L3MR:SDJN:PYZF:ROX2:6FQG:6AD5
    Debug mode (server): true
    Debug mode (client): false
    Fds: 12
    Goroutines: 16
    System Time: Wed Jun  3 09:32:06 UTC 2015
    EventsListeners: 0
    Init SHA1: 7f9c6798b022e64f04d2aff8c75cbf38a2779493
    Init Path: /usr/local/bin/docker
    Docker Root Dir: /mnt/sda1/var/lib/docker

## Troubleshooting

Make sure your docker client version matches your docker server version, or you'll have a bad time.

    $ superdocker remote info
    FATA[0000] Error response from daemon: client and server don't have same version (client : 1.18, server: 1.14)

## Licence

MIT
