import { useState, useEffect, useCallback, useRef } from 'react'
import { getJobs } from '../services'
import { useNavigate } from 'react-router-dom'
import { deleteJob } from '../services'

export default function Home() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState('')

    const navigate = useNavigate()
    const abortControllerRef = useRef(null)
    const debounceTimerRef = useRef(null)

    const fetchJobs = useCallback(async () => {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        // Create a new AbortController
        abortControllerRef.current = new AbortController()
        const signal = abortControllerRef.current.signal

        try {
            setLoading(true)
            const res = await getJobs({
                limit,
                offset: offset * limit,
                name: search,
                signal
            })

            if (res.status === 200) {
                const data = await res.json()
                setJobs(data.jobs)
                setCount(data.count)
            } else {
                console.error('Failed to fetch jobs', res)
            }
        } catch (error) {
            // Handle abort or other errors
            if (error.name === 'AbortError') {
                console.log('Request was cancelled')
            } else {
                console.error('Error fetching jobs', error)
            }
        } finally {
            setLoading(false)
        }
    }, [limit, offset, search])

    // Debounced fetch jobs
    const debouncedFetchJobs = useCallback(() => {
        // Clear any existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        // Set a new timer
        debounceTimerRef.current = setTimeout(() => {
            fetchJobs()
        }, 2000) // 500ms debounce time
    }, [fetchJobs])

    // Effect to trigger debounced fetch
    useEffect(() => {
        debouncedFetchJobs()

        // Cleanup function
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [limit, offset, search, debouncedFetchJobs])

    const handleDeleteJob = async (id) => {
        try {
            const res = await deleteJob(id)
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                alert('Job deleted successfully')
                fetchJobs()
            } else if (res.status === 401) {
                alert('You are not authorized to delete this job')
            } else {
                console.log(res)
                alert('Error deleting job')
            }
        } catch (error) {
            console.error('Delete job error', error)
            alert('Error deleting job')
        }
    }

    return (
        <div>
            <h1>Home</h1>
            <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search"
            />
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>

                    <div
                        style={{
                            height: "400px",
                            width: "400px",
                            overflow: "scroll",
                            border: "1px solid black",
                            margin: "10px",
                            padding: "10px",
                        }}
                    >
                        {jobs.map((job) => (
                            <div key={job.id}>
                                <h2>{job.companyName}</h2>
                                <p>{job.jobPosition}</p>
                                <button onClick={() => navigate(`/editJob/${job._id}`)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteJob(job._id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                    <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                    <button
                        disabled={offset === 0}
                        onClick={() => setOffset((prevOffset) => prevOffset - 1)}
                    >
                        Prev
                    </button>
                    <button
                        disabled={offset * limit + limit >= count}
                        onClick={() => setOffset((prevOffset) => prevOffset + 1)}
                    >
                        Next
                    </button>
                </>
            )}
        </div>
    )
}