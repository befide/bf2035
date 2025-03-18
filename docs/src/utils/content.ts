export function getValue(obj: any, path: string) {
  var pathParts = path.split('.')
  for (var i = 0; i < pathParts.length; i++) {
    if (pathParts[i]! in obj) obj = obj[pathParts[i]!]
    else return
  }
  return obj
}
