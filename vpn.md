# stashapp VPN proxy setup

## tl;dr
[find your provider](https://github.com/qdm12/gluetun-wiki/tree/main/setup/providers) and set up your `docker-compose.yml` accordingly

do ***NOT*** use `network_mode: "service: gluetun"`

```yml
services:
  stash:
    environment:
      - HTTP_PROXY="http://gluetun:8888"
  gluetun:
    image: qmcgaw/gluetun
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      - VPN_SERVICE_PROVIDER=protonvpn
      - VPN_TYPE=wireguard
      - WIREGUARD_PRIVATE_KEY=STASHAPP_GLUETUN_WIREGUARD_PRIVATE_KEY_0000=
      - SERVER_COUNTRIES=Netherlands
      - HTTPPROXY=on
      - HTTPPROXY_STALTH=on
  cdp:
    container_name: cdp
    image: docker.io/chromedp/headless-shell:latest
    network_mode: "service:gluetun"
```
Shut down stash and add `proxy: http://gluetun:8888` to your stash's `config.yml`

Add your cdp address as `http://gluetun:9222/json/version`

## Detailed Guide
> [!TIP]
> ProtonVPN free is not actually recommended since it only has servers in the Netherlands, Japan, Romania, Poland and the US.
> Canada is recommended for people in the US since it's geographically close and lacks most geo-blocks

1. Follow the steps in the [gluetun wiki](https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/) for your provider of choice
2. Set up gluetue accordingly but add support for the HTTP proxy ([docs](https://github.com/qdm12/gluetun-wiki/blob/main/setup/options/http-proxy.md))
```
services:
...
  gluetun:
    image: qmcgaw/gluetun
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    environment:
      - VPN_SERVICE_PROVIDER=protonvpn
      - VPN_TYPE=wireguard
      - WIREGUARD_PRIVATE_KEY=STASHAPP_GLUETUN_WIREGUARD_PRIVATE_KEY_0000=
      - SERVER_COUNTRIES=Netherlands
      - HTTPPROXY=on
      - HTTPPROXY_STALTH=on
...
```
  a. We do not add `network_mode: "service: gluetun"` since it uses port `9999` [for healthchecks](https://github.com/qdm12/gluetun/blob/9933dd3ec5c88d6a6b0f08a23031674c0591248c/Dockerfile#L165). This complicates the networking in general.

3. Shut down your stash instance and add `proxy: http://gluetun:8888` to your `config.yml` file. This is unfortunately [not supported in environment variables](https://docs.stashapp.cc/guides/advanced-configuration-options/)
4. As an extra precaution, add `HTTP_PROXY="http://gluetun:8888"` to your environment variables so that any script that respects it also uses gluetun
5. CDP does not take in proxy variables easily so it's easier just to pass it through to gluetun. Add `network_mode: "service:gluetun"`. This will forward all traffic in and out through gluetun, so you'll have to update your CDP address to reflect this. Instead of connecting to cdp, connect to gluetun at the same port 9222