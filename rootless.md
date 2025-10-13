# rootless docker

Rootless docker with the `stashapp/stash` 

## preamble and clarifications
"Rootless" comes in two main forms:
- Running with `user: x:y` in docker-compose
- Other containerd engines like [Podman](https://podman.io) / [Docker Rootless mode](https://docs.docker.com/engine/security/rootless/) / [Incus](https://linuxcontainers.org/incus/)

Unless you're paranoid about security or are running with user restrictions, you don't need to worry about it

> [!WARNING]
> stashapp/stash does NOT support GUID/ PUID in environment variables
> containers that use that syntax are also rootful by default and unless otherwise specified, usually break in rootless environments

## configuration
```docker-compose.yml
services:
  stash:
    image: stashapp/stash:latest
    ...
    user: 1000:10000
    environment:
      - USER=stash
      - STASH_CONFIG_FILE=/config/config.yml
    volumes:
     ...
     - /mnt/host/stash:/config
```

We add the `USER` environment variable to avoid the following error:
`panic: user: Current requires cgo or $USER set in environment`. This is necessary since stash looks at `$HOME/.config` for the default config path

We also have to override `STASH_CONFIG_FILE` to point outside of `/root/.stash` since not running as root, we don't have access to the `/root` folder, even if we can map the path underneath it

Set `user` to whatever UID/GID combo you use for your apps and make sure the path of the volume you're mapping has access to it too (`chown`)

## readonly
If you have every path mapped and would like additional security assurances, you can prevent changes to filesystems with [read_only](https://docs.docker.com/reference/compose-file/services/#read_only)
This will ensure nothing outside of mount paths will be written to stash. This notably includes adding and updating existing python dependencies.

## migration
Migration is tricky but can be broken down into a few complicated steps
- Adjust your `config.yml` to point to the new paths
  - Since we cannot use `/root/.stash`, you need to remap them to other paths, `/config` is my personal preference
  - `/root/.stash/scrapers` would turn into `/config/scrapers`
- adjust the permissions on your new/old folder to match