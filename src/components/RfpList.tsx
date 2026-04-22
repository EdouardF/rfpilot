import { useI18n } from '../i18n/I18nProvider'
import { useAppStore, useFilteredRfps } from '../store/useAppStore'
import { RFP_STATUS_LABELS, RFP_STATUS_COLORS, PRIORITY_LABELS, PRIORITY_COLORS, formatCurrency, formatDate, daysUntil } from '../utils/helpers'
import type { RfpStatus, RfpPriority } from '../types'

export function RfpList() {
  const { t } = useI18n()
  const filtered = useFilteredRfps()
  const { searchQuery, filterStatus, filterPriority, sortBy, selectedRfp, setSelectedRfp, setSearchQuery, setFilterStatus, setFilterPriority, setSortBy, deleteRfp } = useAppStore()
  const total = useAppStore((s) => s.rfps.length)

  if (total === 0) return <p className="text-slate-500 text-sm">{t('noRfps')}</p>

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search')}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500" />
        <div className="flex gap-2">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as RfpStatus | '')}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white">
            <option value="">{t('all')} — {t('status')}</option>
            {Object.entries(RFP_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value as RfpPriority | '')}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white">
            <option value="">{t('all')} — {t('priority')}</option>
            {Object.entries(PRIORITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'value')}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white">
            <option value="date">{t('sortDate')}</option>
            <option value="priority">{t('sortPriority')}</option>
            <option value="value">{t('sortValue')}</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map((rfp) => {
          const days = daysUntil(rfp.deadline)
          return (
            <div key={rfp.id} onClick={() => setSelectedRfp(rfp.id === selectedRfp ? null : rfp.id)}
              className={`bg-slate-800/50 rounded-lg p-3 cursor-pointer hover:bg-slate-700/50 transition-colors border ${rfp.id === selectedRfp ? 'border-violet-500' : 'border-transparent'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs px-2 py-0.5 rounded ${RFP_STATUS_COLORS[rfp.status]}`}>{RFP_STATUS_LABELS[rfp.status]}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${PRIORITY_COLORS[rfp.priority]}`}>{PRIORITY_LABELS[rfp.priority]}</span>
              </div>
              <p className="text-sm font-medium mb-1">{rfp.title}</p>
              <p className="text-xs text-slate-500">{rfp.agency}</p>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-emerald-400">{formatCurrency(rfp.value)}</span>
                <span className={days < 0 ? 'text-rose-400' : days < 7 ? 'text-amber-400' : 'text-slate-500'}>
                  {days < 0 ? t('overdue') : t('daysLeft', { days: String(days) })}
                </span>
              </div>
              {rfp.id === selectedRfp && (
                <div className="flex justify-end mt-2">
                  <button onClick={(e) => { e.stopPropagation(); deleteRfp(rfp.id) }}
                    className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}