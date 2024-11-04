import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../../components/utilities/layout'

export default function GroupById() {
    const {id} = useParams()
  return (
    <Layout title={`${id}`}>
        <div>{id}</div>
    </Layout>
  )
}
