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
    this.omegga.on('cmd:slay',
    async (speaker: string, target: string, ...args: string[]) => {
      if(this.validate(speaker, target)){
          await this.kill(speaker, target, args.join(' '), '');
      }
    });

    this.omegga.on('cmd:execute',
    async (speaker: string, target: string, ...args: string[]) => {
      if(this.validate(speaker, target)){
        await this.kill(speaker, target, args.join(' '), '-b');
      }
    });

    this.omegga.on('cmd:assassinate',
    async (speaker: string, target: string) => {
      if(this.validate(speaker, target)){
        await this.kill(speaker, target, '', '-s');
      }
    });
    
    return { registeredCommands: ['slay', 'execute', 'assassinate'] };
  }

  async kill(speaker: string, target: string, message: string, option: string){
      const user = this.omegga.getPlayer(speaker);
      const ucolor = user.getNameColor();
      const subject = this.omegga.findPlayerByName(target);
      if(subject != null){
        const scolor = subject.getNameColor();
        if(await subject.isDead()){
          Omegga.whisper(user, `You have attempted a kill command on <color="${scolor}">${subject.name}</>, but they're already dead.`);
        } else {
          subject.kill();
          if(option == '-s'){
            Omegga.whisper(user, `You have attempted a silent kill command on <color="${scolor}">${subject.name}</>.`);
          } else if (option == '-b'){
            Omegga.broadcast(`<color="${scolor}">${subject.name}</> has been slain by <color="${ucolor}">${user.name}</>${message ? `: (${message})` : `.`}`);
          } else {
            Omegga.whisper(subject, `You have been slain by <color="${ucolor}">${user.name}</>${message ? `: (${message})` : `.`}`);
            Omegga.whisper(user, `You have attempted a kill command on <color="${scolor}">${subject.name}</>.`);
          }
        }
      } else {
        Omegga.whisper(user, `Could not find a user with name <color="ffcc99">${target}</>.`);
      }
  }

  validate(speaker: string, target: string): boolean{
    const specialWeapons : string[] = ["a", "b"];
    specialWeapons.includes
    const user = Omegga.getPlayer(speaker);
    if(!user){
      console.log(`Kill command attempted by user ${speaker} that could not be found.`)
    }
    if(!target){
      Omegga.whisper(user, "You need to include a target.");
      return false;
    }
    if(user.getRoles().includes(this.config['authorized-role'])){
      return true;
    } 
    Omegga.whisper(user, "You are not authorized to use this command.");
    return false;
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
