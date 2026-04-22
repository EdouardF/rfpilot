import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { useAppStore } from '../store/useAppStore'
import { COMPLIANCE_LABELS, COMPLIANCE_COLORS, formatDate } from '../utils/helpers'
import type { ComplianceStatus } from '../types'

export function ComplianceChecker() {
  const { t } = useI18n()
  const complianceItems = useAppStore((s) => s.complianceItems)
  const addComplianceItem = useAppStore((s) => s.addComplianceItem)
  const updateComplianceItem = useAppStore((s) => s.updateComplianceItem)
  const deleteComplianceItem = useAppStore((s) => s.deleteComplianceItem)
  const selectedRfp = useAppStore((s) => s.selectedRfp)
  const rfps = useAppStore((s) => s.rfps)
  const [showForm, setShowForm] = useState(false)

  const items = selectedRfp ? complianceItems.filter((c) => c.rfpId === selectedRfp) : complianceItems
  const passed = items.filter((c) => c.status === 'pass').length
  const failed = items.filter((c) => c.status === 'fail').length

  if (complianceItems.length === 0 && !showForm) return (
    <div className="space-y-2">
      <p className="text-slate-500 text-sm">{t('noCompliance')}</p>
      <button onClick={() => setShowForm(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addCompliance')}</button>
    </div>
  )

  return (
    <div className="space-y-3">
      {items.length > 0 && (
        <div className="flex gap-2 text-xs">
          <span className="text-emerald-400">{t('passedChecks')}: {passed}</span>
          <span className="text-rose-400">{t('failedChecks')}: {failed}</span>
        </div>
      )}
      {items.map((item) => (
        <div key={item.id} className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs px-2 py-0.5 rounded ${COMPLIANCE_COLORS[item.status]}`}>{COMPLIANCE_LABELS[item.status]}</span>
            <button onClick={() => deleteComplianceItem(item.id)} className="text-xs text-rose-400 hover:text-rose-300">{t('delete')}</button>
          </div>
          <p className="text-sm">{item.requirement}</p>
          {item.notes && <p className="text-xs text-slate-500 mt-1">{item.notes}</p>}
          <div className="flex gap-1 mt-2">
            {(['pass', 'fail', 'warning'] as ComplianceStatus[]).map((status) => (
              <button key={status} onClick={() => updateComplianceItem(item.id, { status })}
                className={`text-xs px-2 py-0.5 rounded ${item.status === status ? 'ring-1 ring-white' : ''} ${COMPLIANCE_COLORS[status]}`}>
                {COMPLIANCE_LABELS[status]}
              </button>
            ))}
          </div>
        </div>
      ))}
      {showForm ? (
        <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
          <input id="comp-req" placeholder={t('requirement')} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          <input id="comp-notes" placeholder={t('notes')} className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm" />
          {rfps.length > 0 && (
            <select id="comp-rfp" className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm">
              {rfps.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
            </select>
          )}
          <div className="flex gap-2">
            <button onClick={() => {
              const requirement = (document.getElementById('comp-req') as HTMLInputElement).value
              if (!requirement) return
              const notes = (document.getElementById('comp-notes') as HTMLInputElement).value
              const rfpId = rfps.length > 0 ? (document.getElementById('comp-rfp') as HTMLSelectElement).value : ''
              addComplianceItem({ id: Math.random().toString(36).substring(2, 10) + Date.now().toString(36), rfpId, requirement, status: 'not_checked', notes: notes || undefined })
              setShowForm(false)
            }} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('save')}</button>
            <button onClick={() => setShowForm(false)} className="text-xs text-slate-400">{t('cancel')}</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="text-xs bg-violet-600 hover:bg-violet-500 px-3 py-1 rounded">{t('addCompliance')}</button>
      )}
    </div>
  )
}

