export default class AppError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }

  static build(name, message) {
    return new AppError(name, message);
  }
}
