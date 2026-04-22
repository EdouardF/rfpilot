/** RFP status */
export type RfpStatus = 'draft' | 'in_progress' | 'submitted' | 'won' | 'lost'

/** Compliance check status */
export type ComplianceStatus = 'pass' | 'fail' | 'warning' | 'not_checked'

/** RFP priority */
export type RfpPriority = 'low' | 'medium' | 'high' | 'critical'

/** A government RFP */
export interface Rfp {
  id: string
  title: string
  agency: string
  status: RfpStatus
  priority: RfpPriority
  deadline: string
  value: number
  description: string
  createdAt: string
}

/** A proposal response */
export interface Proposal {
  id: string
  rfpId: string
  title: string
  content: string
  complianceScore: number
  generatedAt: string
}

/** A compliance checklist item */
export interface ComplianceItem {
  id: string
  rfpId: string
  requirement: string
  status: ComplianceStatus
  notes?: string
}

/** Deadline tracker entry */
export interface Deadline {
  id: string
  rfpId: string
  label: string
  date: string
  isPast: boolean
}