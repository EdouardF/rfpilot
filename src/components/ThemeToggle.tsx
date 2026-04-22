import { useTheme } from '../hooks/useTheme'
import { useI18n } from '../i18n/I18nProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()
  const options: Array<{ value: 'dark' | 'light' | 'system'; label: string }> = [
    { value: 'dark', label: t('dark') }, { value: 'light', label: t('light') }, { value: 'system', label: t('system') },
  ]
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-slate-500">{t('theme')}</label>
      <div className="flex rounded-lg overflow-hidden border border-slate-700">
        {options.map((opt) => (
          <button key={opt.value} onClick={() => setTheme(opt.value)}
            className={`px-3 py-1 text-xs transition-colors ${theme === opt.value ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}