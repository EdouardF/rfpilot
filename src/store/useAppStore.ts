import { create } from 'zustand'
import type { Rfp, Proposal, ComplianceItem, Deadline } from '../types'

interface AppState {
  rfps: Rfp[]
  proposals: Proposal[]
  complianceItems: ComplianceItem[]
  deadlines: Deadline[]
  error: string | null

  addRfp: (r: Rfp) => void
  updateRfp: (id: string, updates: Partial<Rfp>) => void
  deleteRfp: (id: string) => void

  addProposal: (p: Proposal) => void
  updateProposal: (id: string, updates: Partial<Proposal>) => void
  deleteProposal: (id: string) => void

  addComplianceItem: (c: ComplianceItem) => void
  updateComplianceItem: (id: string, updates: Partial<ComplianceItem>) => void
  deleteComplianceItem: (id: string) => void

  addDeadline: (d: Deadline) => void
  deleteDeadline: (id: string) => void

  setError: (msg: string | null) => void
  reset: () => void
}

const initialState = { rfps: [], proposals: [], complianceItems: [], deadlines: [], error: null }

export const useAppStore = create<AppState>((set) => ({
  ...initialState,

  addRfp: (r) => set((s) => ({ rfps: [...s.rfps, r] })),
  updateRfp: (id, updates) => set((s) => ({ rfps: s.rfps.map((r) => r.id === id ? { ...r, ...updates } : r) })),
  deleteRfp: (id) => set((s) => ({ rfps: s.rfps.filter((r) => r.id !== id) })),

  addProposal: (p) => set((s) => ({ proposals: [...s.proposals, p] })),
  updateProposal: (id, updates) => set((s) => ({ proposals: s.proposals.map((p) => p.id === id ? { ...p, ...updates } : p) })),
  deleteProposal: (id) => set((s) => ({ proposals: s.proposals.filter((p) => p.id !== id) })),

  addComplianceItem: (c) => set((s) => ({ complianceItems: [...s.complianceItems, c] })),
  updateComplianceItem: (id, updates) => set((s) => ({ complianceItems: s.complianceItems.map((c) => c.id === id ? { ...c, ...updates } : c) })),
  deleteComplianceItem: (id) => set((s) => ({ complianceItems: s.complianceItems.filter((c) => c.id !== id) })),

  addDeadline: (d) => set((s) => ({ deadlines: [...s.deadlines, d] })),
  deleteDeadline: (id) => set((s) => ({ deadlines: s.deadlines.filter((d) => d.id !== id) })),

  setError: (msg) => set({ error: msg }),
  reset: () => set(initialState),
}))