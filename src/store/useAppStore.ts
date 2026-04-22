import { create } from 'zustand'
import type { Rfp, Proposal, ComplianceItem, Deadline, RfpStatus, RfpPriority } from '../types'

type SortKey = 'date' | 'priority' | 'value'

interface AppState {
  rfps: Rfp[]
  proposals: Proposal[]
  complianceItems: ComplianceItem[]
  deadlines: Deadline[]
  selectedRfp: string | null
  searchQuery: string
  filterStatus: RfpStatus | ''
  filterPriority: RfpPriority | ''
  sortBy: SortKey
  error: string | null

  addRfp: (r: Rfp) => void
  updateRfp: (id: string, updates: Partial<Rfp>) => void
  deleteRfp: (id: string) => void
  setSelectedRfp: (id: string | null) => void

  addProposal: (p: Proposal) => void
  updateProposal: (id: string, updates: Partial<Proposal>) => void
  deleteProposal: (id: string) => void

  addComplianceItem: (c: ComplianceItem) => void
  updateComplianceItem: (id: string, updates: Partial<ComplianceItem>) => void
  deleteComplianceItem: (id: string) => void

  addDeadline: (d: Deadline) => void
  deleteDeadline: (id: string) => void

  setSearchQuery: (q: string) => void
  setFilterStatus: (s: RfpStatus | '') => void
  setFilterPriority: (p: RfpPriority | '') => void
  setSortBy: (s: SortKey) => void
  setError: (msg: string | null) => void
  reset: () => void
}

const initialState = { rfps: [], proposals: [], complianceItems: [], deadlines: [], selectedRfp: null, searchQuery: '', filterStatus: '' as RfpStatus | '', filterPriority: '' as RfpPriority | '', sortBy: 'date' as SortKey, error: null }

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  addRfp: (r) => set((s) => ({ rfps: [...s.rfps, r] })),
  updateRfp: (id, updates) => set((s) => ({ rfps: s.rfps.map((r) => r.id === id ? { ...r, ...updates } : r) })),
  deleteRfp: (id) => set((s) => ({ rfps: s.rfps.filter((r) => r.id !== id) })),
  setSelectedRfp: (id) => set({ selectedRfp: id }),
  addProposal: (p) => set((s) => ({ proposals: [...s.proposals, p] })),
  updateProposal: (id, updates) => set((s) => ({ proposals: s.proposals.map((p) => p.id === id ? { ...p, ...updates } : p) })),
  deleteProposal: (id) => set((s) => ({ proposals: s.proposals.filter((p) => p.id !== id) })),
  addComplianceItem: (c) => set((s) => ({ complianceItems: [...s.complianceItems, c] })),
  updateComplianceItem: (id, updates) => set((s) => ({ complianceItems: s.complianceItems.map((c) => c.id === id ? { ...c, ...updates } : c) })),
  deleteComplianceItem: (id) => set((s) => ({ complianceItems: s.complianceItems.filter((c) => c.id !== id) })),
  addDeadline: (d) => set((s) => ({ deadlines: [...s.deadlines, d] })),
  deleteDeadline: (id) => set((s) => ({ deadlines: s.deadlines.filter((d) => d.id !== id) })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setFilterStatus: (s) => set({ filterStatus: s }),
  setFilterPriority: (p) => set({ filterPriority: p }),
  setSortBy: (s) => set({ sortBy: s }),
  setError: (msg) => set({ error: msg }),
  reset: () => set(initialState),
}))

export const useFilteredRfps = () => useAppStore((s) => {
  let result = [...s.rfps]
  if (s.searchQuery) { const q = s.searchQuery.toLowerCase(); result = result.filter((r) => r.title.toLowerCase().includes(q) || r.agency.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) }
  if (s.filterStatus) result = result.filter((r) => r.status === s.filterStatus)
  if (s.filterPriority) result = result.filter((r) => r.priority === s.filterPriority)
  const priorityOrder: Record<RfpPriority, number> = { critical: 0, high: 1, medium: 2, low: 3 }
  if (s.sortBy === 'date') result.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
  else if (s.sortBy === 'priority') result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  else if (s.sortBy === 'value') result.sort((a, b) => b.value - a.value)
  return result
})

export const useRfpStats = () => useAppStore((s) => ({
  total: s.rfps.length,
  totalValue: s.rfps.reduce((sum, r) => sum + r.value, 0),
  pending: s.rfps.filter((r) => r.status === 'draft' || r.status === 'in_progress').length,
  won: s.rfps.filter((r) => r.status === 'won').length,
}))

export const useSelectedRfp = () => useAppStore((s) => s.rfps.find((r) => r.id === s.selectedRfp) || null)