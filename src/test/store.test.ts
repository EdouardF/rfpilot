import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../store/useAppStore'
import type { Rfp, Proposal, ComplianceItem, Deadline } from '../types'

describe('useAppStore', () => {
  beforeEach(() => useAppStore.getState().reset())

  it('add/update/delete rfp', () => {
    const r: Rfp = { id: '1', title: 'Test RFP', agency: 'DoD', status: 'draft', priority: 'high', deadline: '2026-06-01', value: 500000, description: 'Test', createdAt: '2026-01-01' }
    useAppStore.getState().addRfp(r)
    expect(useAppStore.getState().rfps).toHaveLength(1)
    useAppStore.getState().updateRfp('1', { status: 'won' })
    expect(useAppStore.getState().rfps[0].status).toBe('won')
    useAppStore.getState().deleteRfp('1')
    expect(useAppStore.getState().rfps).toHaveLength(0)
  })

  it('add/update/delete proposal', () => {
    const p: Proposal = { id: '1', rfpId: 'r1', title: 'Test Proposal', content: 'Content', complianceScore: 85, generatedAt: '2026-01-01' }
    useAppStore.getState().addProposal(p)
    useAppStore.getState().updateProposal('1', { complianceScore: 92 })
    expect(useAppStore.getState().proposals[0].complianceScore).toBe(92)
    useAppStore.getState().deleteProposal('1')
    expect(useAppStore.getState().proposals).toHaveLength(0)
  })

  it('add/update/delete compliance item', () => {
    const c: ComplianceItem = { id: '1', rfpId: 'r1', requirement: 'Must have security', status: 'pass' }
    useAppStore.getState().addComplianceItem(c)
    useAppStore.getState().updateComplianceItem('1', { status: 'fail' })
    expect(useAppStore.getState().complianceItems[0].status).toBe('fail')
    useAppStore.getState().deleteComplianceItem('1')
    expect(useAppStore.getState().complianceItems).toHaveLength(0)
  })

  it('add/delete deadline', () => {
    const d: Deadline = { id: '1', rfpId: 'r1', label: 'Submission', date: '2026-06-01', isPast: false }
    useAppStore.getState().addDeadline(d)
    expect(useAppStore.getState().deadlines).toHaveLength(1)
    useAppStore.getState().deleteDeadline('1')
    expect(useAppStore.getState().deadlines).toHaveLength(0)
  })

  it('search/filter/sort state', () => {
    useAppStore.getState().setSearchQuery('test')
    expect(useAppStore.getState().searchQuery).toBe('test')
    useAppStore.getState().setFilterStatus('won')
    expect(useAppStore.getState().filterStatus).toBe('won')
    useAppStore.getState().setFilterPriority('critical')
    expect(useAppStore.getState().filterPriority).toBe('critical')
    useAppStore.getState().setSortBy('value')
    expect(useAppStore.getState().sortBy).toBe('value')
  })

  it('reset clears everything', () => {
    useAppStore.getState().setError('fail')
    useAppStore.getState().reset()
    expect(useAppStore.getState().error).toBeNull()
    expect(useAppStore.getState().rfps).toHaveLength(0)
    expect(useAppStore.getState().searchQuery).toBe('')
  })
})