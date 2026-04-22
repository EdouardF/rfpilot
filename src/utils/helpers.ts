import type { RfpStatus, RfpPriority, ComplianceStatus } from '../types'

export const RFP_STATUS_LABELS: Record<RfpStatus, string> = {
  draft: 'Draft',
  in_progress: 'In Progress',
  submitted: 'Submitted',
  won: 'Won',
  lost: 'Lost',
}

export const RFP_STATUS_COLORS: Record<RfpStatus, string> = {
  draft: 'bg-slate-500/20 text-slate-400',
  in_progress: 'bg-blue-500/20 text-blue-400',
  submitted: 'bg-amber-500/20 text-amber-400',
  won: 'bg-emerald-500/20 text-emerald-400',
  lost: 'bg-rose-500/20 text-rose-400',
}

export const PRIORITY_LABELS: Record<RfpPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

export const PRIORITY_COLORS: Record<RfpPriority, string> = {
  low: 'bg-slate-500/20 text-slate-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-amber-500/20 text-amber-400',
  critical: 'bg-rose-500/20 text-rose-400',
}

export const COMPLIANCE_LABELS: Record<ComplianceStatus, string> = {
  pass: 'Pass',
  fail: 'Fail',
  warning: 'Warning',
  not_checked: 'Not Checked',
}

export const COMPLIANCE_COLORS: Record<ComplianceStatus, string> = {
  pass: 'bg-emerald-500/20 text-emerald-400',
  fail: 'bg-rose-500/20 text-rose-400',
  warning: 'bg-amber-500/20 text-amber-400',
  not_checked: 'bg-slate-500/20 text-slate-400',
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const now = new Date()
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
}