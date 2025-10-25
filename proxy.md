# stashapp http proxy setup

A subset of [vpn](./vpn.md) setup

1. Locate your config.yml for stash
2. Shut down stash
3. Get your proxy URL. For backers, check [discourse](https://discourse.stashapp.cc/t/t/4071) for a free CA proxy
    1. In this example I'll be using `$PROXY` as a stand-in
    2. This should follow the format `http://user:password@my-proxy@example.com:port`
4. Add `proxy: $PROXY` to the end `config.yml`, without indents.
5. Add `HTTP_PROXY="$PROXY"` to your environment variables for scripts to pick up on