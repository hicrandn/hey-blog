/**
 * Formats a date string into a readable format
 * @param dateString - ISO date string or Date object
 * @param format - Format type: 'long' | 'short' | 'relative'
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date, format: 'long' | 'short' | 'relative' = 'long'): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  // For relative dates
  if (format === 'relative') {
    if (diffInDays < 1) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  // For short format (e.g., "Jan 15, 2024")
  if (format === 'short') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // For long format (e.g., "January 15, 2024")
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

/**
 * Formats a date string into a time format
 * @param dateString - ISO date string or Date object
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export function formatTime(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

/**
 * Formats a date string into a date and time format
 * @param dateString - ISO date string or Date object
 * @returns Formatted date and time string (e.g., "January 15, 2024 at 2:30 PM")
 */
export function formatDateTime(dateString: string | Date): string {
  const date = new Date(dateString)
  return `${formatDate(date, 'long')} at ${formatTime(date)}`
}

/**
 * Formats a date string into an ISO format
 * @param dateString - ISO date string or Date object
 * @returns ISO formatted date string
 */
export function formatISO(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toISOString()
}

/**
 * Checks if a date is within the last 24 hours
 * @param dateString - ISO date string or Date object
 * @returns boolean
 */
export function isWithinLast24Hours(dateString: string | Date): boolean {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  return diffInHours <= 24
}

/**
 * Formats a duration in milliseconds into a readable format
 * @param ms - Duration in milliseconds
 * @returns Formatted duration string (e.g., "2 hours 30 minutes")
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days === 1 ? '' : 's'}`
  if (hours > 0) return `${hours} hour${hours === 1 ? '' : 's'}`
  if (minutes > 0) return `${minutes} minute${minutes === 1 ? '' : 's'}`
  return `${seconds} second${seconds === 1 ? '' : 's'}`
} 