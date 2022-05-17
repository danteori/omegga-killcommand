import OmeggaPlugin, { OL, PS, PC } from 'omegga';

type Config = { foo: string };
type Storage = { bar: string };

export default class Plugin implements OmeggaPlugin<Config, Storage> {
  omegga: OL;
  config: PC<Config>;
  store: PS<Storage>;

  constructor(omegga: OL, config: PC<Config>, store: PS<Storage>) {
    this.omegga = omegga;
    this.config = config;
    this.store = store;
  }

  async init() {
    // Write your plugin!
    this.omegga.on('cmd:kill',
    async (speaker: string, target: string, ...args: string[]) => {
        if(Omegga.getPlayer(speaker).isHost()){
          const user = this.omegga.getPlayer(speaker);
          const subject = this.omegga.findPlayerByName(target);
          if(subject != null){
            subject.kill();
            if(args.length > 0){
              Omegga.whisper(subject, `${user.name} has killed you: ${args.join(' ')}`);
            } else {
              Omegga.whisper(subject, `${user.name} has killed you.`);
            }
            Omegga.whisper(user, `You have attempted a kill command on <color="ffcc99">${subject.name}.`);
          } else {
            Omegga.whisper(user, `Could not find a user with name <color="ffcc99">${target}.`);
          }
        }
      });

    return { registeredCommands: ['kill'] };
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
