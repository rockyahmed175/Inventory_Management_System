import React, { useEffect, useState, useContext } from 'react'
import api from '../../services/api'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function ItemPage() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [item, setItem] = useState(null)

  useEffect(() => {
    api.get(`/items/${id}`).then(r => setItem(r.data.item)).catch(() => setItem(null))
  }, [id])

  const toggleLike = async () => {
    if (!user) return alert('Login to like')
    await api.post(`/items/${id}/like`)
    // reload or optimistic update
  }

  if (!item) return <div>Loading...</div>

  return (
    <div className="card">
      <h3>{item.customId} — {item.title}</h3>
      <div>Created: {new Date(item.createdAt).toLocaleString()}</div>
      <div className="mt-3">{item.values && item.values.map(v => <div key={v.id}><strong>{v.fieldTitle}</strong>: {v.valueText || v.valueNum?.toString() || (v.valueBool ? 'Yes' : '')}</div>)}</div>
      <div className="mt-3"><button onClick={toggleLike} className="btn btn-sm">Like</button></div>
    </div>
  )
}
