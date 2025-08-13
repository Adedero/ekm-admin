export class Env {
  get<K extends keyof NodeJS.ProcessEnv>(key: K): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Key: ${String(key)} not found in environment variables`);
    }
    return value;
  }

  getSafe<T = string>(key: keyof NodeJS.ProcessEnv, defaultValue?: T): T {
    const value = process.env[key];
    if (value === undefined && defaultValue !== undefined) {
      return defaultValue;
    }
    if (value === undefined) {
      throw new Error(`Missing environment variable: ${String(key)}`);
    }
    return value as T;
  }

  set(key: keyof NodeJS.ProcessEnv, value: string): void {
    process.env[key] = value;
  }

  has(key: keyof NodeJS.ProcessEnv): boolean {
    return Object.prototype.hasOwnProperty.call(process.env, key);
  }
}

const env = new Env();
export default env;
