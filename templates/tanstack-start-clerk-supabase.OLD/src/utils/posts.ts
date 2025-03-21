import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServerClient } from './supabase.js'
import { getWebRequest } from '@tanstack/react-start/server'
import { getAuth } from '@clerk/tanstack-start/server'
import { queryOptions } from '@tanstack/react-query'

export type PostType = {
  id: number
  title: string
  body: string
  user_id: string
  created_at: string
}

// Function to get current user ID from Clerk
async function getCurrentUserId() {
  try {
    const { userId } = await getAuth(getWebRequest()!)
    return userId
  } catch (error) {
    console.error('Error getting auth:', error)
    return null
  }
}

// Server Function to fetch a single post
export const fetchPost = createServerFn({ method: 'GET' })
  .validator((postId: string) => postId)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`)
    
    try {
      const supabase = await getSupabaseServerClient()
      
      // Try to fetch from Supabase first
      const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', data)
        .single()
      
      if (error) {
        console.error('Supabase error:', error)
        
        // Fallback to JSONPlaceholder if Supabase fails or is not set up
        if (error.code === 'PGRST116') { // Table not found
          // Use JSONPlaceholder as fallback
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${data}`)
          if (!response.ok) {
            if (response.status === 404) {
              throw notFound()
            }
            throw new Error(`Failed to fetch post: ${response.statusText}`)
          }
          return await response.json()
        }
        
        if (error.code === '42P01') { // Relation does not exist
          throw new Error('Supabase table "posts" does not exist. Please run the DDL script.')
        }
        
        throw error
      }
      
      if (!post) {
        throw notFound()
      }
      
      return post
    } catch (err: any) {
      console.error(err)
      if (err.code === 'PGRST116' || err.message?.includes('not found')) {
        throw notFound()
      }
      throw err
    }
  })

// Server Function to fetch all posts
export const fetchPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    console.info('Fetching posts...')
    const userId = await getCurrentUserId()
    
    try {
      const supabase = await getSupabaseServerClient()
      
      // Try to fetch from Supabase first
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        
        // Fallback to JSONPlaceholder if Supabase fails or is not set up
        if (error.code === 'PGRST116' || error.code === '42P01') {
          // Use JSONPlaceholder as fallback
          const response = await fetch('https://jsonplaceholder.typicode.com/posts')
          if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`)
          }
          const data = await response.json()
          return data.slice(0, 10)
        }
        
        throw error
      }
      
      return posts || []
    } catch (err) {
      console.error(err)
      throw err
    }
  },
)

// Create a new post
export const createPost = createServerFn({ method: 'POST' })
  .validator((data: { title: string; body: string }) => data)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      const { data: newPost, error } = await supabase
        .from('posts')
        .insert([
          {
            title: data.title,
            body: data.body,
            user_id: userId
          }
        ])
        .select()
        .single()
      
      if (error) {
        console.error('Error creating post:', error)
        
        // Handle table not found error
        if (error.code === 'PGRST116' || error.code === '42P01') {
          throw new Error('Supabase table "posts" does not exist. Please run the DDL script.')
        }
        
        throw error
      }
      
      return newPost
    } catch (err) {
      console.error('Failed to create post:', err)
      throw err
    }
  })

// Update a post
export const updatePost = createServerFn({ method: 'PUT' })
  .validator((data: { id: number; title: string; body: string }) => data)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      // Verify post belongs to user
      const { data: existingPost } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', data.id)
        .single()
      
      if (existingPost && existingPost.user_id !== userId) {
        throw new Error('Not authorized to update this post')
      }
      
      const { data: updatedPost, error } = await supabase
        .from('posts')
        .update({
          title: data.title,
          body: data.body
        })
        .eq('id', data.id)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating post:', error)
        throw error
      }
      
      return updatedPost
    } catch (err) {
      console.error('Failed to update post:', err)
      throw err
    }
  })

// Delete a post
export const deletePost = createServerFn({ method: 'DELETE' })
  .validator((postId: number) => postId)
  .handler(async ({ data: postId }) => {
    const userId = await getCurrentUserId()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }
    
    try {
      const supabase = await getSupabaseServerClient()
      
      // Verify post belongs to user
      const { data: existingPost } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', postId)
        .single()
      
      if (existingPost && existingPost.user_id !== userId) {
        throw new Error('Not authorized to delete this post')
      }
      
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
      
      if (error) {
        console.error('Error deleting post:', error)
        throw error
      }
      
      return { success: true, id: postId }
    } catch (err) {
      console.error('Failed to delete post:', err)
      throw err
    }
  })

// Query options for React Query
export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(),
  })

export const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['post', postId],
    queryFn: () => fetchPost({ data: postId }),
  })