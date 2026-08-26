import { motion } from 'framer-motion'

const s = {
  card: {
    border: '1px solid #f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
    transition: 'box-shadow 0.2s',
  },
  imgWrap: { width: '100%', aspectRatio: '16/10', background: '#fafafa', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  img: { width: '100%', height: '100%', objectFit: 'contain', display: 'block' },
  body: { padding: 16 },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  title: { fontSize: 14, fontWeight: 500, color: '#111' },
  votes: { fontSize: 14, fontWeight: 600, color: '#23A38F' },
  barBg: { width: '100%', height: 6, background: '#f5f5f5', borderRadius: 99, overflow: 'hidden', marginBottom: 4 },
  pct: { fontSize: 11, color: '#ccc' },
  num: { width: '100%', aspectRatio: '16/10', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600, color: '#e0e0e0' },
}

export default function ResultCard({ project, maxVotes, rank, index }) {
  const pct = maxVotes > 0 ? (project.votes / maxVotes) * 100 : 0
  const imageUrl = project.image_url || project.image || project.photo || project.thumbnail

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      style={s.card}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
    >
      {imageUrl ? (
        <div style={s.imgWrap}><img src={imageUrl} alt={project.title} style={s.img} /></div>
      ) : (
        <div style={s.num}>{String(index + 1).padStart(2, '0')}</div>
      )}
      <div style={s.body}>
        <div style={s.row}>
          <div style={s.title}>{project.title}</div>
          <div style={s.votes}>{project.votes}</div>
        </div>
        <div style={s.barBg}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            style={{ height: '100%', borderRadius: 99, background: rank === 0 && project.votes > 0 ? '#23A38F' : '#ddd' }}
          />
        </div>
        <div style={s.pct}>{pct.toFixed(1)}%</div>
      </div>
    </motion.div>
  )
}
