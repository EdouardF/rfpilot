import { RfpList } from './RfpList'
import { ComplianceChecker } from './ComplianceChecker'
import { DeadlineTracker } from './DeadlineTracker'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-xl font-bold">RFPilot</h1>
        <p className="text-sm text-slate-500">AI Government RFP Responder</p>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">RFPs</h2>
          <RfpList />
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Compliance</h2>
          <ComplianceChecker />
        </div>
        <div>
          <h2 className="text-sm font-medium text-slate-400 mb-3">Deadlines</h2>
          <DeadlineTracker />
        </div>
      </main>
    </div>
  )
}