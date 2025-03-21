export function formatDate(id: number): string {
  // Using the id to generate a random date within the last year
  const now = new Date()
  const daysAgo = (id * 7) % 365 // Using id to generate a somewhat random number of days ago
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
} 