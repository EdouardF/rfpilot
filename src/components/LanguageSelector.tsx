import { useI18n } from '../i18n/I18nProvider'
import { LOCALE_NAMES, type Locale } from '../i18n/translations'

export function LanguageSelector() {
  const { locale, setLocale, t } = useI18n()
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-slate-500">{t('language')}</label>
      <select value={locale} onChange={(e) => setLocale(e.target.value as Locale)}
        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white">
        {Object.entries(LOCALE_NAMES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
    </div>
  )
}