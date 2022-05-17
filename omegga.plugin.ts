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
        await this.kill(speaker, target, args.join(' '), '');
    });

    this.omegga.on('cmd:execute',
    async (speaker: string, target: string, ...args: string[]) => {
        await this.kill(speaker, target, args.join(' '), '-b');
    });

    this.omegga.on('cmd:assassinate',
    async (speaker: string, target: string, ...args: string[]) => {
        await this.kill(speaker, target, args.join(' '), '-s');
    });


    return { registeredCommands: ['kill', 'execute', 'assassinate'] };
  }

  async kill(speaker: string, target: string, message: string, option: string){
    if(Omegga.getPlayer(speaker).isHost()){ // user validation
      const user = this.omegga.getPlayer(speaker);
      
      const subject = this.omegga.findPlayerByName(target);
    
      if(subject != null){
        if(subject.isDead){
          Omegga.whisper(user, `You have attempted a kill command on <color="${subject.getNameColor()}">${subject.name}</>, but they're already dead.`);
        } else {
          subject.kill();
          if(option == '-s'){
            Omegga.whisper(user, `You have attempted a silent kill command on <color="${subject.getNameColor()}">${subject.name}</>.`);
          } else if (option == '-b'){
            if(message){
              Omegga.broadcast(`<color="${subject.getNameColor()}">${subject.name}</> has been killed by <color="${user.getNameColor()}">${user.name}</>: (${message})`);
            } else {
              Omegga.broadcast(`<color="${subject.getNameColor()}">${subject.name}</> has been killed by <color="${user.getNameColor()}">${user.name}</>.`);
            }
          } else {
            if(message){
              Omegga.whisper(subject, `<color="${user.getNameColor()}">${user.name}</> has killed you: (${message})`);
            } else {
              Omegga.whisper(subject, `<color="${user.getNameColor()}">${user.name}</> has killed you.`);
            }
            Omegga.whisper(user, `You have attempted a kill command on <color="${subject.getNameColor()}">${subject.name}</>.`);
          }
        }
      } else {
        Omegga.whisper(user, `Could not find a user with name <color="ffcc99">${target}</>.`);
      }
    }
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
