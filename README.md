<!--

When uploading your plugin to github/gitlab
start your repo name with "omegga-"

example: https://github.com/danteori/omegga-killcommand

Your plugin will be installed via omegga install gh:danteori/killcommand

-->

# killcommand

A typed safe plugin for [omegga](https://github.com/brickadia-community/omegga).

## Install

`omegga install gh:danteori/killcommand`

## Usage

1. Configure the role authorization in the omegga web client. By default, the host and any users with role "Admin" will be able to use the following commands.

2. `/slay targetname` will kill a target and send them a message letting them know you have slain them. You can personalize the message with `/slay targetname message`.

- Example:
    - `/slay onion` : player onion dies and receives message: 
            "You have been slain by `user`."
    - `/slay onion clean your lair` : player onion dies and receives message: 
            "You have been slain by `user`: (clean your lair)"

3. `/execute targetname` will kill a target and broadcast a message to the entire server letting everyone know that you killed them. You can personalize the broadcast message with `/execute targetname message`.

- Example:
    - `/execute onion` : player onion dies and the server receives message: 
            "onion has been killed by `user`."
    - `/execute onion smells bad` : player onion dies and the server receives message:
            "onion has been killed by `user`: (smells bad)"

4. `/assassinate targetname` will kill a target and nobody will know but the user. You cannot personalize an assassination (that would be unprofessional).

- Example:
    - `/assassinate onion` : player onion dies and nobody will ever know who did it.
