interface Post {
  id: number
  title: string
  body: string
  reactions: number
  tags: string[]
  userId: number
}

interface User {
  id: number
  firstName: string
  lastName: string
  image: string
  email: string
}

const BASE_URL = 'https://dummyjson.com'

export async function getPosts(limit = 10) {
  try {
    const res = await fetch(`${BASE_URL}/posts?limit=${limit}`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) throw new Error('Failed to fetch posts')
    const data = await res.json()
    return data.posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function searchPosts(query: string, limit = 5) {
  try {
    const res = await fetch(`${BASE_URL}/posts/search?q=${query}&limit=${limit}`)
    if (!res.ok) throw new Error('Failed to search posts')
    const data = await res.json()
    return data.posts || []
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

export async function getUsers(userIds: number[]) {
  try {
    // DummyJSON doesn't support multiple user fetching, so we'll fetch them one by one
    const userPromises = userIds.map(async (userId) => {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        next: { revalidate: 3600 }
      })
      if (!res.ok) throw new Error(`Failed to fetch user ${userId}`)
      return res.json()
    })

    const users = await Promise.all(userPromises)
    return users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      email: user.email
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export async function getRandomUsers(count = 1) {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`)
    if (!res.ok) throw new Error('Failed to fetch random users')
    const data = await res.json()
    
    return data.results.map((user: any) => ({
      id: user.login.uuid,
      firstName: user.name.first,
      lastName: user.name.last,
      image: user.picture.large,
      email: user.email
    }))
  } catch (error) {
    console.error('Error fetching random users:', error)
    return []
  }
} 