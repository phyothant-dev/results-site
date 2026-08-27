import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import ResultCard from './components/ResultCard'
import VoteBar from './components/VoteBar'
import { getProjectsWithVotes } from './lib/supabase'

const s = {
  page: { minHeight: '100vh', background: '#fff' },
  content: { maxWidth: 1100, margin: '0 auto', padding: '40px 5% 60px' },
  hero: { textAlign: 'center', marginBottom: 48 },
  title: { fontSize: 36, fontWeight: 600, color: '#23A38F', letterSpacing: '-0.02em' },
  subtitle: { fontSize: 13, color: '#999', marginTop: 6 },
  sectionTitle: { fontSize: 11, fontWeight: 600, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16, marginBottom: 48 },
  empty: { textAlign: 'center', padding: '40px 0', color: '#ccc', fontSize: 13 },
  allVotesBox: { border: '1px solid #f0f0f0', borderRadius: 12, padding: 20 },
}

export default function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchResults = useCallback(async () => {
    try {
      const data = await getProjectsWithVotes()
      setProjects(data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResults()
    const interval = setInterval(fetchResults, 10000)
    return () => clearInterval(interval)
  }, [fetchResults])

  const totalVotes = projects.reduce((sum, p) => sum + p.votes, 0)
  const maxVotes = Math.max(...projects.map(p => p.votes), 1)

  return (
    <div style={s.page}>
      <Header />

      <div style={s.content}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={s.hero}>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 600, color: '#23A38F', letterSpacing: '-0.02em' }}>9<sup style={{ fontSize: '0.6em' }}>th</sup> Project Exhibition 2026 Voting Results</h2>
          <p style={s.subtitle}>
            {totalVotes} votes{lastUpdated ? ` · ${lastUpdated.toLocaleTimeString()}` : ''}
          </p>
        </motion.div>

        {loading ? (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <div style={{ width: 20, height: 20, border: '2px solid #e0e0e0', borderTopColor: '#23A38F', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        ) : (
          <>
            <section>
              <div style={s.sectionTitle}>Vote Distribution</div>
              <div style={s.allVotesBox}>
                {projects.sort((a, b) => b.votes - a.votes).map((p, i) => (
                  <VoteBar key={p.id} project={p} maxVotes={maxVotes} index={i} />
                ))}
              </div>
            </section>
           </>
        )}
      </div>

      <footer style={{ background: 'linear-gradient(135deg, #23A38F, #5681b5)', padding: '16px 5%', textAlign: 'center', marginTop: 40 }}>
        <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: '#fff', lineHeight: 1.6 }}>
          Copyright &copy; 2026 University Of Computer Studies, Monywa. Developed By Phyothant
        </p>
      </footer>
    </div>
  )
}
