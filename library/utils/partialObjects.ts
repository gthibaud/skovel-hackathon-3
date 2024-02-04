// Partial only applies to the first level of properties, this is a deep partial that applies to all levels of properties in an object
// This is useful for themes where you want to only override a few properties but keep the rest of the object the same (ex : base theme + dark theme)

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? DeepPartial<U>[]
        : T[P] extends object
          ? DeepPartial<T[P]>
          : T[P];
};

export function mergeObjects<T>(target: T, partial: DeepPartial<T>): T {
    return { ...target, ...partial };
}
