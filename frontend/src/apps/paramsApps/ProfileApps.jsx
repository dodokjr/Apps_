import React from 'react'
import { useParams } from 'react-router-dom';

export default function ProfileApps() {
  const {name} = useParams()
  return (
    <div>Profile {name}</div>
  )
}
