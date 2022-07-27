import NotificationContext from './notificationContext.js';

export default class RouterEntity extends NotificationContext {
  constructor({ image, background }) {
    super();

    this.image = image;
    this.background = background;
  }

  isValid() {
    if (!this.image || !this.background) {
      this.addNotification('empty files');
    }

    return !this.hasNotification();
  }
}
