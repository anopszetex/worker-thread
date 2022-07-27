const kNotification = Symbol('kNotification');

export default class NotificationContext {
  constructor() {
    this[kNotification] = [];
  }

  addNotification(notification) {
    this[kNotification].push(notification);
  }

  hasNotification() {
    return this[kNotification].length > 0;
  }

  getNotification() {
    return this[kNotification];
  }
}
