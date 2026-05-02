export type StackType = "backend" | "frontend";
export type LevelType = "debug" | "info" | "warn" | "error" | "fatal";
export interface LogPayload {
    stack: StackType;
    level: LevelType;
    package: string;
    message: string;
}
export declare const Log: (stack: StackType, level: LevelType, pkg: string, message: string) => Promise<void>;
//# sourceMappingURL=index.d.ts.map