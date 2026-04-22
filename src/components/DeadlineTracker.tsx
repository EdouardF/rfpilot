import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useAppStore } from '../store/useAppStore'
import { formatDate, daysUntil } from '../utils/helpers'

export function DeadlineTracker() {
  const { t } = useI18n()
  const deadlines = useAppStore((s) => s.deadlines)
  const addDeadline = useAppStore((s) => s.addDeadline)
  const deleteDeadline = useAppStore((s) => s.deleteDeadline)
  const [showForm, setShowForm] = useState(false)

  const sorted = [...deadlines].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (deadlines.length === 0 && !showForm) return (
    <div className="space-y-2">
      <p className="text-slate-500 text-sm">{t('noDeadlines')}</p>
      <button onClick={() => setShowForm(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addDeadline')}</button>
    </div>
  )

  return (
    <div className="space-y-3">
      {sorted.map((d) => {
        const days = daysUntil(d.date)
        return (
          <div key={d.id} className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{d.label}</span>
              <button onClick={() => deleteDeadline(d.id)} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">{formatDate(d.date)}</span>
              <span className={d.isPast || days < 0 ? 'text-rose-400' : days < 7 ? 'text-amber-400' : 'text-slate-400'}>
                {d.isPast || days < 0 ? t('overdue') : t('daysLeft', { days: String(days) })}
              </span>
            </div>
          </div>
        )
      })}
      {showForm ? (
        <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
          <input id="dl-label" placeholder={t('label')} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          <input id="dl-date" type="date" className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          <div className="flex gap-2">
            <button onClick={() => {
              const label = (document.getElementById('dl-label') as HTMLInputElement).value
              const date = (document.getElementById('dl-date') as HTMLInputElement).value
              if (!label || !date) return
              const days = daysUntil(date)
              addDeadline({ id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36), rfpId: '', label, date, isPast: days < 0 })
              setShowForm(false)
            }} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
            <button onClick={() => setShowForm(false)} className="text-xs text-slate-400">{t('cancel')}</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addDeadline')}</button>
      )}
    </div>
  )
}