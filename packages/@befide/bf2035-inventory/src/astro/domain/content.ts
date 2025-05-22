export function getValue(obj: any, path: string) {
  const pathParts = path.split(".")
  for (let i = 0; i < pathParts.length; i++) {
    if (pathParts[i]! in obj) obj = obj[pathParts[i]!]
    else return
  }
  return obj
}

export function getLocalizedValue(obj: any, path: string, locale = "en") {
  if (!obj) {
    return obj as string
  }

  const pathParts = (path + "." + locale).split(".")
  for (let i = 0; i < pathParts.length; i++) {
    if (pathParts[i]! in obj) obj = obj[pathParts[i]!]
    else return obj as string
  }
  return obj as string
}
