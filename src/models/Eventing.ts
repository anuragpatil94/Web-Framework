// Type Alias
type Callback = () => void;

export class Eventing {
  // To store all the events
  private events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    // since this.events[eventName] can either be array of callbacks or undefined
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  };
}
