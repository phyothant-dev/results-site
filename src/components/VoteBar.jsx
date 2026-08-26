import { motion } from 'framer-motion'

export default function VoteBar({ project, maxVotes, index }) {
  const pct = maxVotes > 0 ? (project.votes / maxVotes) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03 }}
      style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}
    >
      <div style={{ width: 'clamp(80px, 20vw, 120px)', fontSize: 12, color: '#999', textAlign: 'right', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {project.title}
      </div>
      <div style={{ flex: 1, height: 28, background: '#f5f5f5', borderRadius: 99, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(pct, project.votes > 0 ? 10 : 0)}%` }}
          transition={{ duration: 0.6, delay: index * 0.05 }}
          style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #23A38F, #5681b5)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }}
        >
          {project.votes > 0 && <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{project.votes}</span>}
        </motion.div>
      </div>
    </motion.div>
  )
}
