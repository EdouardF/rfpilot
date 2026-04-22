import { useAppStore } from '../store/useAppStore'
import { formatDate } from '../utils/helpers'
import type { Deadline as DeadlineType } from '../types'

export function DeadlineTracker() {
  const deadlines = useAppStore((s) => s.deadlines)

  if (deadlines.length === 0) return <p className="text-slate-500 text-sm">No deadlines tracked.</p>

  return (
    <div className="space-y-2">
      {deadlines.map((d: DeadlineType) => (
        <div key={d.id} className={`bg-slate-800/50 rounded-lg p-3 ${d.isPast ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm">{d.label}</span>
            <span className={`text-xs ${d.isPast ? 'text-rose-400' : 'text-slate-400'}`}>
              {formatDate(d.date)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}