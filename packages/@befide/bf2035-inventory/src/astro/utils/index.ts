export * from "./content.courses"
export * from "./content.facilities"
export * from "./content.organizations"
export * from "./content.taxonomyItems"
export * from "./content.theses"

export const getValue = (obj: any, path: string) => {
  if (!obj) return

  const keys = path.split(".")
  return keys.reduce((currentObj, key) => currentObj[key], obj)
}


// export const getLocalizedValue = (obj: any, path: string, locale: string) => {
//   if (!obj) return

//   const keys = path.split(".").push(locale)

//   return keys.reduce((currentObj, key) => currentObj[key], obj)
// }
