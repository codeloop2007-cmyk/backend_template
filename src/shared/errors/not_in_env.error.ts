export class NotInEnvError extends Error {
  constructor(variableName: string) {
    super(`Environment variable "${variableName}" is missing.`);
    this.name = "NotInEnvError";
  }
}
