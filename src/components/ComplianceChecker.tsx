import { useAppStore } from '../store/useAppStore'
import { COMPLIANCE_LABELS, COMPLIANCE_COLORS } from '../utils/helpers'
import type { ComplianceItem } from '../types'

export function ComplianceChecker() {
  const items = useAppStore((s) => s.complianceItems)
  const updateItem = useAppStore((s) => s.updateComplianceItem)

  if (items.length === 0) return <p className="text-slate-500 text-sm">No compliance checks yet.</p>

  return (
    <div className="space-y-2">
      {items.map((c: ComplianceItem) => (
        <div key={c.id} className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">{c.requirement}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${COMPLIANCE_COLORS[c.status]}`}>
              {COMPLIANCE_LABELS[c.status]}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <button onClick={() => updateItem(c.id, { status: 'pass' })} className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">Pass</button>
            <button onClick={() => updateItem(c.id, { status: 'fail' })} className="text-xs px-2 py-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">Fail</button>
            <button onClick={() => updateItem(c.id, { status: 'warning' })} className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-400 hover:bg-amber-500/30">Warning</button>
          </div>
        </div>
      ))}
    </div>
  )
}