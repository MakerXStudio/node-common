const caseInsensitiveCollator = new Intl.Collator(undefined, {
  sensitivity: 'base',
})

export const caseInsensitiveCompare = (a: string, b: string): number => caseInsensitiveCollator.compare(a, b)
