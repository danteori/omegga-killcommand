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

1. Configure the role authorization in the omegga web client. By default, users with role "Admin" or the host will be able to use killcommand.

2. `/kill targetname` will kill a target and send them a message letting them know you killed them. You can personalize the message with `/kill targetname message`.

- Example:
    - `/kill onion` : player onion dies and receives message "<user> has killed you."
    - `/kill onion clean your lair` : player onion dies and receives message "<user> has killed you: (clean your lair)"

3. `/execute targetname` will kill a target and broadcast a message to the entire server letting everyone know that you killed them. You can personalize the broadcast message with `/execute targetname message`.

- Example:
    - `/execute onion` : player onion dies and the server receives message "onion has been killed by <user>."
    - `/execute onion smells bad` : player onion dies and the server receives message "onion has been killed by <user>: (smells bad)"

4. `/assassinate targetname` will kill a target and nobody will know but the user. You cannot personalize an assassination (that would be unprofessional).

- Example:
    - `/assassinate onion` : player onion dies and nobody will ever know who did it."
