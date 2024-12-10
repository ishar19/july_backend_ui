import { useState, useEffect } from 'react'
import { getJobs } from '../services'
import { useNavigate } from 'react-router-dom'
import { deleteJob } from '../services'
export default function Home() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
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
    useEffect(() => {

        fetchJobs()
    }, [])
    const handleDeleteJob = async (id) => {
        const res = await deleteJob(id)
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            alert('job deleted successfully')
            fetchJobs()
        }
        else if (res.status === 401) {
            alert('you are not authorized to delete this job')
        }
        else {
            console.log(res)
            alert('error')
        }
    }
    console.log(jobs)
    const navigate = useNavigate()
    return (
        <div>
            <h1>Home</h1>
            {loading ? <h1>loading...</h1> : jobs.map((job) => (
                <div key={job.id}>
                    <h2>{job.companyName}</h2>
                    <p>{job.jobPosition}</p>
                    <button onClick={() => navigate(`/editJob/${job._id}`)}>edit</button>
                    <button onClick={() => handleDeleteJob(job._id)}>delete</button>
                </div>
            ))}
        </div>
    )
}