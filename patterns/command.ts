interface Command {
  execute(): void;
  undo(): void;
}

class NoCommand implements Command {
  execute(): void {}
  undo(): void {}
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.on();
  }
  undo(): void {
    this.light.off();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.off();
  }
  undo(): void {
    this.light.on();
  }
}

class Light {
  on() {
    console.log("Light is on");
  }
  off() {
    console.log("Light is off");
  }
}

class RemoteController {
  private undoStack: Command[] = []

  constructor(private onCommands: Command[], private offCommands: Command[]) {}

  executeCommandOn(slot: number) {
    const onCommand = this.onCommands[slot];
    if (onCommand !== undefined) {
      onCommand.execute();
      this.undoStack.push(onCommand);
    }
  }

  executeCommandOff(slot: number) {
    const offCommand = this.offCommands[slot];
    if (offCommand !== undefined) {
      offCommand.execute();
      this.undoStack.push(offCommand);
    }
  }

  undoLastCommand() {
    const lastCommand = this.undoStack.pop() ?? new NoCommand();
    lastCommand.undo();
  }
}

(() => {
  const light = new Light();

  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);

  const controller = new RemoteController([lightOnCommand], [lightOffCommand]);
  
  controller.executeCommandOn(0);
  controller.executeCommandOff(0);
  controller.executeCommandOn(0);
  controller.undoLastCommand();
  controller.undoLastCommand();
  controller.undoLastCommand();

})()
