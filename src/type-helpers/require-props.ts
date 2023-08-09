/**
 * Invariant assertion that the given object has the specified properties, and that they are not null or undefined.
 *
 * @param obj The object to check
 * @param props The properties to check
 *
 * Usage:
 * ```
 * const obj: { maybeProp?: string } = { maybeProp: 'hello' }
 *
 * // Optional chaining required
 * console.log(obj.maybeProp?.toLowerCase())
 *
 * requireProps(obj, 'maybeProp')
 *
 * // Optional chaining not required as we have asserted it is not null or undefined
 * console.log(obj.maybeProp.toLowerCase())
 * ```
 */
export function requireProps<T, TProps extends keyof T & string>(obj: T, ...props: TProps[]): asserts obj is RequireSomeProps<T, TProps> {
  for (const prop of props) {
    if (obj[prop] === undefined || obj[prop] === null) throw new Error(`Missing mandatory field ${prop}`)
  }
}

/**
 * Returns a filter function that: returns true if the given object has the specified properties, and they are not null or undefined.
 * @param props The properties to check
 *
 * Usage:
 * ```
 * const objects: Array<{ maybeProp?: string }> = [{ maybeProp: 'hello' }, {}, {maybeProp: 'foo'}]
 *
 * // res1 type is Array<string | undefined> because there is no type assertion
 * const res1 = objects.filter(x => x.maybeProp != undefined).map(x => x.maybeProp)
 *
 * // res2 type is Array<string> due to type assertion that required props will not be null or undefined
 * const res2 = objects.filter(hasRequiredProps('maybeProp')).map(x => x.maybeProp)
 * ```
 */
export const hasRequiredProps =
  <T, TProps extends keyof T & string>(...props: TProps[]) =>
  (obj: T): obj is RequireSomeProps<T, TProps> => {
    requireProps(obj, ...props)
    return true
  }

export type RequireSomeProps<T, TProps extends keyof T> = {
  [key in TProps]-?: Exclude<T[key], null | undefined>
} & T
