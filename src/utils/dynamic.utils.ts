export abstract class DynamicUtils {
    static moveTo<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }
}
