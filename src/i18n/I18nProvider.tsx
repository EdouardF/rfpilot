import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { translations, type Locale } from './translations'

interface I18nContextValue { locale: Locale; setLocale: (l: Locale) => void; t: (key: string, vars?: Record<string, string>) => string }
const I18nContext = createContext<I18nContextValue>({ locale: 'en', setLocale: () => {}, t: (k) => k })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => (localStorage.getItem('locale') as Locale) || 'en')
  const handleSetLocale = useCallback((l: Locale) => { setLocale(l); localStorage.setItem('locale', l) }, [])
  const t = useCallback((key: string, vars?: Record<string, string>) => {
    let val = translations[locale]?.[key] || translations.en[key] || key
    if (vars) Object.entries(vars).forEach(([k, v]) => { val = val.replace(`{${k}}`, v) })
    return val
  }, [locale])
  return <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>{children}</I18nContext.Provider>
}

export function useI18n() { return useContext(I18nContext) }