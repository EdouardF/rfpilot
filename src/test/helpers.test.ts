import { describe, it, expect } from 'vitest'
import { RFP_STATUS_LABELS, PRIORITY_LABELS, COMPLIANCE_LABELS, formatDate, formatCurrency, daysUntil, generateId } from '../utils/helpers'

describe('helpers', () => {
  it('RFP_STATUS_LABELS has all statuses', () => {
    expect(RFP_STATUS_LABELS.draft).toBe('Draft')
    expect(RFP_STATUS_LABELS.won).toBe('Won')
    expect(RFP_STATUS_LABELS.lost).toBe('Lost')
  })

  it('PRIORITY_LABELS has all levels', () => {
    expect(PRIORITY_LABELS.low).toBe('Low')
    expect(PRIORITY_LABELS.critical).toBe('Critical')
  })

  it('COMPLIANCE_LABELS has all statuses', () => {
    expect(COMPLIANCE_LABELS.pass).toBe('Pass')
    expect(COMPLIANCE_LABELS.fail).toBe('Fail')
    expect(COMPLIANCE_LABELS.warning).toBe('Warning')
  })

  it('formatDate returns readable date', () => {
    expect(formatDate('2026-04-22')).toBeTruthy()
  })

  it('formatDate returns input for invalid', () => {
    expect(formatDate('bad')).toBe('bad')
  })

  it('formatCurrency formats USD', () => {
    expect(formatCurrency(50000)).toContain('$')
  })

  it('daysUntil returns positive for future date', () => {
    const future = new Date()
    future.setDate(future.getDate() + 30)
    expect(daysUntil(future.toISOString())).toBeGreaterThan(0)
  })

  it('generateId returns unique strings', () => {
    const ids = new Set(Array.from({ length: 10 }, () => generateId()))
    expect(ids.size).toBe(10)
  })
})