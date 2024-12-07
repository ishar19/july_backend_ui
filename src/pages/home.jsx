import { useState, useEffect } from 'react'
import { getJobs } from '../services'
export default function Home() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true)
            const res = await getJobs()
            if (res.status === 200) {
                const data = await res.json()
                setJobs(data)
            }
            else {
                console.log(res)
            }
            setLoading(false)
        }
        fetchJobs()
    }, [])
    console.log(jobs)
    return (
        <div>
            <h1>Home</h1>
            {loading ? <h1>loading...</h1> : jobs.map((job) => (
                <div key={job.id}>
                    <h2>{job.title}</h2>
                    <p>{job.description}</p>
                </div>
            ))}
        </div>
    )
}