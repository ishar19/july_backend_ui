import { useState, useEffect } from 'react'
import { getJobs } from '../services'
import { useNavigate } from 'react-router-dom'
import { deleteJob } from '../services'
const debouncingTime = 1000
const debounce = (func, wait) => {
    let timeout
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.call(context, []), wait)
}
export default function Home() {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState('')
    const fetchJobs = async () => {
        setLoading(true)
        const res = await getJobs({ limit, offset: offset * limit, name: search })
        if (res.status === 200) {
            const data = await res.json()
            setJobs(data.jobs)
            setCount(data.count)
        }
        else {
            console.log(res)
        }
        setLoading(false)
    }
    useEffect(() => {
        // add debouncing
        debounce(() => {
            fetchJobs
        }, debouncingTime)
        // fetchDebounced()
    }, [limit, offset, search])
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
    const navigate = useNavigate()
    return (
        <div>
            <h1>Home</h1>
            {loading ? <h1>loading...</h1> : <>
                <input type="text" onChange={(e) => { setSearch(e.target.value) }} value={search} placeholder="search" />
                <div style={{
                    height: "400px",
                    width: "400px",
                    overflow: "scroll",
                    border: "1px solid black",
                    margin: "10px",
                    padding: "10px",
                }}> {jobs.map((job) => (
                    <div key={job.id}>
                        <h2>{job.companyName}</h2>
                        <p>{job.jobPosition}</p>
                        <button onClick={() => navigate(`/editJob/${job._id}`)}>edit</button>
                        <button onClick={() => handleDeleteJob(job._id)}>delete</button>
                    </div>
                ))}</div>
                <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </select>
                <button disabled={offset === 0} onClick={() => setOffset((offset) => offset - 1)}>Prev</button>
                <button disabled={offset * limit + limit >= count} onClick={() => setOffset((offset) => offset + 1)}>Next</button>

            </>}
        </div>
    )
}


// debouncing

// homework
// revise call bind and apply
// read about abort controller


// tomorrow 
// array filters and abort controller

// sat -> doubts, ui code