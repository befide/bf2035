import { persistentMap } from "@nanostores/persistent"

export type SettingsValue = {
  sidebar: "show" | "hide"
  theme: "dark" | "light" | "system"
  fitSpread: "true" | "false"
  debug: "true" | "false"
  printPreview: "true" | "false"
}

export const settings = persistentMap<SettingsValue>("settings:", {
  sidebar: "show",
  theme: "system",
  debug: "false",
  fitSpread: "false",
  printPreview: "false",
})

function setFitSpreadScale() {
  const windowSize = { height: window.innerHeight, width: window.innerWidth }
  const boundingRect = { width: 1588, height: 1123 }
  const scale = Math.min(
    (windowSize.height - 100) / boundingRect.height,
    windowSize.width / boundingRect.width,
  )

  document.documentElement.style.setProperty("--fit-spread-scale", scale + "")
}

export const updateDocumentSettings = {
  theme: () => {
    document.documentElement.dataset.theme =
      settings.get().theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : settings.get().theme
  },
  debug: () => {
    document.documentElement.dataset.debug = settings.get().debug
    if (document.getElementById("toggle__debug")) {
      ;(document.getElementById("toggle__debug") as HTMLInputElement).checked =
        settings.get().debug === "true"
    }
  },
  fitSpread: () => {
    document.documentElement.dataset.fitSpread = settings.get().fitSpread

    if (settings.get().fitSpread === "true") {
      setFitSpreadScale()
      window.onresize = setFitSpreadScale
    } else {
    }

    if (document.getElementById("toggle__fit_spread")) {
      ;(
        document.getElementById("toggle__fit_spread") as HTMLInputElement
      ).checked = settings.get().fitSpread === "true"
    }
  },
  printPreview: () => {
    document.documentElement.dataset.printPreview = settings.get().printPreview
    if (document.getElementById("toggle__print_preview")) {
      ;(
        document.getElementById("toggle__print_preview") as HTMLInputElement
      ).checked = settings.get().printPreview === "true"
    }
  },
}

export const toggleTheme = () => {
  if (settings.get().theme === "system") {
    settings.setKey("theme", "light")
  } else {
    settings.setKey(
      "theme",
      settings.get().theme === "light" ? "dark" : "system",
    )
  }
  updateDocumentSettings.theme()
  return settings.get().theme
}
export const toggleDebug = () => {
  settings.setKey("debug", settings.get().debug === "false" ? "true" : "false")
  updateDocumentSettings.debug()
}
export const toggleFitSpread = () => {
  settings.setKey(
    "fitSpread",
    settings.get().fitSpread === "false" ? "true" : "false",
  )
  updateDocumentSettings.fitSpread()
}
export const togglePrintPreview = () => {
  settings.setKey(
    "printPreview",
    settings.get().printPreview === "false" ? "true" : "false",
  )
  updateDocumentSettings.printPreview()
}
