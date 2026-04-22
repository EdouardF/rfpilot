import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useAppStore, useFilteredRfps, useRfpStats } from '../store/useAppStore'
import { RFP_STATUS_LABELS, PRIORITY_LABELS, formatCurrency, generateId } from '../utils/helpers'
import type { RfpStatus, RfpPriority } from '../types'
import { RfpList } from './RfpList'
import { ComplianceChecker } from './ComplianceChecker'
import { DeadlineTracker } from './DeadlineTracker'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSelector } from './LanguageSelector'

export function Dashboard() {
  const { t } = useI18n()
  const stats = useRfpStats()
  const addRfp = useAppStore((s) => s.addRfp)
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white transition-colors">
      <header className="border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{t('appTitle')}</h1>
            <p className="text-sm text-slate-500">{t('appSubtitle')}</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
        {stats.total > 0 && (
          <div className="flex gap-4 mt-3 text-xs">
            <span className="text-slate-400">{t('totalRfps')}: {stats.total}</span>
            <span className="text-emerald-400">{t('totalValue')}: {formatCurrency(stats.totalValue)}</span>
            {stats.pending > 0 && <span className="text-amber-400">{t('pendingReview')}: {stats.pending}</span>}
            {stats.won > 0 && <span className="text-emerald-400">{t('won')}: {stats.won}</span>}
          </div>
        )}
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-slate-400">{t('rfps')}</h2>
            <button onClick={() => setShowAdd(!showAdd)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addRfp')}</button>
          </div>
          {showAdd && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 mb-3 space-y-2">
              <input id="rfp-title" placeholder={t('title')} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm" />
              <input id="rfp-agency" placeholder={t('agency')} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm" />
              <input id="rfp-value" type="number" placeholder={t('value')} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm" />
              <select id="rfp-status" className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1.5 text-sm">
                {Object.entries(RFP_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <select id="rfp-priority" className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1.5 text-sm">
                {Object.entries(PRIORITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <input id="rfp-deadline" type="date" className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm" />
              <textarea id="rfp-desc" placeholder={t('description')} rows={2} className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-1.5 text-sm resize-none" />
              <div className="flex gap-2">
                <button onClick={() => {
                  const title = (document.getElementById('rfp-title') as HTMLInputElement).value
                  const agency = (document.getElementById('rfp-agency') as HTMLInputElement).value
                  const value = parseFloat((document.getElementById('rfp-value') as HTMLInputElement).value) || 0
                  const status = (document.getElementById('rfp-status') as HTMLSelectElement).value as RfpStatus
                  const priority = (document.getElementById('rfp-priority') as HTMLSelectElement).value as RfpPriority
                  const deadline = (document.getElementById('rfp-deadline') as HTMLInputElement).value
                  const description = (document.getElementById('rfp-desc') as HTMLTextAreaElement).value
                  if (!title || !agency) return
                  addRfp({ id: generateId(), title, agency, status, priority, deadline: deadline || new Date().toISOString().split('T')[0], value, description, createdAt: new Date().toISOString() })
                  setShowAdd(false)
                }} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
                <button onClick={() => setShowAdd(false)} className="text-xs text-slate-400">{t('cancel')}</button>
              </div>
            </div>
          )}
          <RfpList />
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">{t('compliance')}</h2>
          <ComplianceChecker />
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">{t('deadlines')}</h2>
          <DeadlineTracker />
        </div>
      </main>
    </div>
  )
}