import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getResults() {
  const { data, error } = await supabase
    .from('votes')
    .select('project_id, projects(title, category)')

  if (error) throw error
  return data
}

export async function getProjectsWithVotes() {
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: true })

  if (projectsError) throw projectsError

  const { data: votes, error: votesError } = await supabase
    .from('votes')
    .select('project_id')

  if (votesError) throw votesError

  const voteCounts = {}
  votes.forEach(v => {
    voteCounts[v.project_id] = (voteCounts[v.project_id] || 0) + 1
  })

  return projects.map(p => ({
    ...p,
    votes: voteCounts[p.id] || 0
  }))
}
