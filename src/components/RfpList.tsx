import { useAppStore } from '../store/useAppStore'
import { RFP_STATUS_LABELS, RFP_STATUS_COLORS, PRIORITY_LABELS, PRIORITY_COLORS, formatCurrency, daysUntil } from '../utils/helpers'
import type { Rfp } from '../types'

export function RfpList() {
  const rfps = useAppStore((s) => s.rfps)

  if (rfps.length === 0) return <p className="text-slate-500 text-sm">No RFPs yet.</p>

  return (
    <div className="space-y-2">
      {rfps.map((r: Rfp) => (
        <div key={r.id} className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">{r.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded ${RFP_STATUS_COLORS[r.status]}`}>
              {RFP_STATUS_LABELS[r.status]}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{r.agency}</span>
            <span>{formatCurrency(r.value)}</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className={`px-2 py-0.5 rounded ${PRIORITY_COLORS[r.priority]}`}>
              {PRIORITY_LABELS[r.priority]}
            </span>
            <span>{daysUntil(r.deadline)}d left</span>
          </div>
        </div>
      ))}
    </div>
  )
}