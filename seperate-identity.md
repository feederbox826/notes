# How to seperate your anonymous stash dev identity
This guide assumes knowledge of various topics. Sorry.

## git identity splitting
[Generate a new SSH identity](https://docs.github.com/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

Now assuming your new identity, `iodine-swizzle` [or generate your own with a passphrase](https://bitwarden.com/password-generator/#password-generator)

Assuming you already have a functional `~/.ssh/config` that looks something like
```ini
Host *
	IdentityFile ~/.ssh/id_ed25519
	User firstname
Host myserver
    HostName myserver.example.com
```

prepend fake host overrides for your new identity
```ini
Host iodine-swizzle-github.com
	HostName github.com
	User git
	IdentityFile ~/.ssh/iodine-swizzle
	CheckHostIP no
Host gist.iodine-swizzle-github.com
	HostName gist.github.com
	User git
	IdentityFile ~/.ssh/iodine-swizzle
	CheckHostIP no
```

This adds the fake domains only for git ssh cloning. When cloning `iodine-swizzle/stash` your fork of `stashapp/stash`, copy the SSH address.

Replace `github.com` with `iodine-swizzle-github.com` to make `git@iodine-swizzle-github.com:iodine-swizzle/stash.git`

Cloning from this URL will use your key for `iodine-swizzle` instead of `firstname`.

## git config changes
When committing under another account, it is important to change your git config to not reveal your identity. You can check all your settings with `git config --list`. 

Notable changes include
- user.email
- user.name
- user.signingkey
- commit.gpgsign

Unless you already have another email account configured, you'll likely want to go with the github noreply email. This follow the format `username@users.noreply.github.com`

For iodine-swizzle:
```sh
git config user.name Iodine Swizzle
git config user.email iodine-swizzle@users.noreply.github.com
git config commit.gpgsign false
```

Changing `commit.gpgsign` to false will prevent the usage of `user.signingkey`.

After making a commit, make sure to verify that your new identity is in use - this can be confirmed with `git log`.

## git config - multiple repositories
If you have repositories segregated by folder, you can set overrides per file [StackOverflow](https://stackoverflow.com/a/48088291)

`~/.gitconfig (global)`
```ini
[includeIf "gitdir:~/stash-projects/"]
	path = ~/stash-projects/gitconfig
```

`~/stash-projects/gitconfig`
```ini
[user]
	name = Iodine Swizzle
	email = iodine-swizzle@users.noreply.github.com
[commit]
	gpgsign = false
```

## amending the last commit
If you committed but didn't push using the right identity, assume the correct one and then continue with your fix

```
git commit --amend --author="Author Name <email@address.com>" --no-edit
```

In our case,
```
git commit --amend --author="Iodine Swizzle <iodine-swizzle@users.noreply.github.com>" --no-edit
```

If you want to correct this for all commits in a repository, [Github](https://web.archive.org/web/20200823163529/https://docs.github.com/en/github/using-git/changing-author-info#changing-the-git-history-of-your-repository-using-a-script) outlines some steps for rewriting history as well as a [StackOverflow](https://stackoverflow.com/q/3042437) Question that addresses this.

## browser goofs
While local commits can be set-and-forget, the day-to-day with browsers and github.com can be dangerous since issues and comments might require intervention to delete

In order to prevent that, you can block access to certain sites in uBlock Origin
```
||github.com/stashapp^$document
```

The aforementioned rule blocks visiting any site that starts with `github.com/stashapp/`. This would include `stashapp/stash` and `stashapp/CommunityScripts`. A similar rule can also be extended to other resources and sites. Being aware of what you are doing and under which identity you are working under is always important, nonetheless.