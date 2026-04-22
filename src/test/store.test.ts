import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../store/useAppStore'
import type { Rfp, Proposal, ComplianceItem, Deadline } from '../types'

describe('useAppStore', () => {
  beforeEach(() => useAppStore.getState().reset())

  it('should add RFP', () => {
    const r: Rfp = { id: '1', title: 'Test', agency: 'DOD', status: 'draft', priority: 'high', deadline: '2026-06-01', value: 50000, description: 'Test RFP', createdAt: '2026-01-01' }
    useAppStore.getState().addRfp(r)
    expect(useAppStore.getState().rfps).toHaveLength(1)
  })

  it('should update RFP', () => {
    const r: Rfp = { id: '1', title: 'Test', agency: 'DOD', status: 'draft', priority: 'medium', deadline: '2026-06-01', value: 0, description: '', createdAt: '2026-01-01' }
    useAppStore.getState().addRfp(r)
    useAppStore.getState().updateRfp('1', { status: 'submitted' })
    expect(useAppStore.getState().rfps[0].status).toBe('submitted')
  })

  it('should delete RFP', () => {
    const r: Rfp = { id: '1', title: 'X', agency: 'N/A', status: 'draft', priority: 'low', deadline: '2026-01-01', value: 0, description: '', createdAt: '2026-01-01' }
    useAppStore.getState().addRfp(r)
    useAppStore.getState().deleteRfp('1')
    expect(useAppStore.getState().rfps).toHaveLength(0)
  })

  it('should add and update proposal', () => {
    const p: Proposal = { id: '1', rfpId: 'r1', title: 'P', content: '', complianceScore: 0, generatedAt: '2026-01-01' }
    useAppStore.getState().addProposal(p)
    useAppStore.getState().updateProposal('1', { complianceScore: 85 })
    expect(useAppStore.getState().proposals[0].complianceScore).toBe(85)
  })

  it('should add and delete compliance item', () => {
    const c: ComplianceItem = { id: '1', rfpId: 'r1', requirement: 'Test', status: 'not_checked' }
    useAppStore.getState().addComplianceItem(c)
    expect(useAppStore.getState().complianceItems).toHaveLength(1)
    useAppStore.getState().deleteComplianceItem('1')
    expect(useAppStore.getState().complianceItems).toHaveLength(0)
  })

  it('should update compliance item', () => {
    const c: ComplianceItem = { id: '1', rfpId: 'r1', requirement: 'X', status: 'not_checked' }
    useAppStore.getState().addComplianceItem(c)
    useAppStore.getState().updateComplianceItem('1', { status: 'pass' })
    expect(useAppStore.getState().complianceItems[0].status).toBe('pass')
  })

  it('should add and delete deadline', () => {
    const d: Deadline = { id: '1', rfpId: 'r1', label: 'Submit', date: '2026-06-01', isPast: false }
    useAppStore.getState().addDeadline(d)
    expect(useAppStore.getState().deadlines).toHaveLength(1)
    useAppStore.getState().deleteDeadline('1')
    expect(useAppStore.getState().deadlines).toHaveLength(0)
  })

  it('should set and clear error', () => {
    useAppStore.getState().setError('err')
    expect(useAppStore.getState().error).toBe('err')
    useAppStore.getState().setError(null)
    expect(useAppStore.getState().error).toBeNull()
  })

  it('should reset all state', () => {
    const r: Rfp = { id: '1', title: 'X', agency: 'N/A', status: 'draft', priority: 'low', deadline: '2026-01-01', value: 0, description: '', createdAt: '2026-01-01' }
    useAppStore.getState().addRfp(r)
    useAppStore.getState().reset()
    expect(useAppStore.getState().rfps).toHaveLength(0)
  })
})