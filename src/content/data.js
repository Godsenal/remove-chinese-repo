export const REMOVE_EVENT_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR"
};

class RemoveData extends Set {
  constructor() {
    super();
    this.listeners = {
      [REMOVE_EVENT_TYPE.ADD]: [],
      [REMOVE_EVENT_TYPE.REMOVE]: [],
      [REMOVE_EVENT_TYPE.CLEAR]: []
    };
  }
  add(item) {
    super.add(item);
    this.emit(REMOVE_EVENT_TYPE.ADD, this);
  }
  delete(item) {
    super.delete(item);
    this.emit(REMOVE_EVENT_TYPE.REMOVE, this);
  }
  clear() {
    super.clear();
    this.emit(REMOVE_EVENT_TYPE.CLEAR, this);
  }
  on(type, handler) {
    const target = this.listeners[type];
    Array.isArray(target) && target.push(handler);
  }
  off(type, handler) {
    const target = this.listeners[type];
    Array.isArray(target) && target.filter(listener => listener !== handler);
  }
  emit(type, payload) {
    const target = this.listeners[type];
    Array.isArray(target) && target.forEach(listener => listener(payload));
  }
}

const removeData = new RemoveData();

export default removeData;
