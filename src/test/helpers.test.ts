import { describe, it, expect } from 'vitest'
import { RFP_STATUS_LABELS, PRIORITY_LABELS, COMPLIANCE_LABELS, formatDate, formatCurrency, daysUntil, generateId, filterRfps, sortRfps } from '../utils/helpers'
import type { Rfp } from '../types'

const sampleRfps: Rfp[] = [
  { id: '1', title: 'Defense Contract', agency: 'DoD', status: 'in_progress', priority: 'critical', deadline: '2026-07-01', value: 500000, description: 'Large defense contract', createdAt: '2026-01-01' },
  { id: '2', title: 'IT Services', agency: 'GSA', status: 'won', priority: 'high', deadline: '2026-05-01', value: 200000, description: 'IT services for GSA', createdAt: '2026-01-02' },
  { id: '3', title: 'Research Grant', agency: 'NSF', status: 'draft', priority: 'low', deadline: '2026-08-01', value: 100000, description: 'Research funding', createdAt: '2026-01-03' },
]

describe('helpers', () => {
  it('RFP_STATUS_LABELS', () => { expect(RFP_STATUS_LABELS.won).toBe('Won') })
  it('PRIORITY_LABELS', () => { expect(PRIORITY_LABELS.critical).toBe('Critical') })
  it('COMPLIANCE_LABELS', () => { expect(COMPLIANCE_LABELS.pass).toBe('Pass') })
  it('formatDate valid', () => { expect(formatDate('2026-04-22')).toBeTruthy() })
  it('formatDate invalid', () => { expect(formatDate('bad')).toBe('bad') })
  it('formatCurrency', () => { expect(formatCurrency(500000)).toContain('500,000') })
  it('daysUntil future', () => { expect(daysUntil('2099-12-31')).toBeGreaterThan(0) })
  it('daysUntil past', () => { expect(daysUntil('2020-01-01')).toBeLessThan(0) })
  it('generateId unique', () => { expect(new Set(Array.from({ length: 10 }, () => generateId())).size).toBe(10) })

  describe('filterRfps', () => {
    it('filter by status', () => { expect(filterRfps(sampleRfps, 'won')).toHaveLength(1) })
    it('filter by priority', () => { expect(filterRfps(sampleRfps, undefined, 'critical')).toHaveLength(1) })
    it('filter by query', () => { expect(filterRfps(sampleRfps, undefined, undefined, 'defense')).toHaveLength(1) })
    it('no filter returns all', () => { expect(filterRfps(sampleRfps)).toHaveLength(3) })
  })

  describe('sortRfps', () => {
    it('sort by date', () => { expect(sortRfps(sampleRfps, 'date')[0].deadline).toBe('2026-08-01') })
    it('sort by priority', () => { expect(sortRfps(sampleRfps, 'priority')[0].priority).toBe('critical') })
    it('sort by value', () => { expect(sortRfps(sampleRfps, 'value')[0].value).toBe(500000) })
  })
})