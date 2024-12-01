import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import '../css/JobList.css';

interface Job {
    id: number;
    title: string;
    salary: number;
    category: {
        id: number;
        name: string;
    };
}

interface JobListProps {
    filters: { categories: number[]; salary: number | null };
}



const JobList: React.FC<JobListProps> = ({ filters })=> {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [count, setCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const jobsPerPage = 10;

    useEffect(()=> {
        const fetchJobs = async ()=> {
            console.log("Filters sent to API:", filters);
            try {
                const response = await axiosClient.get('/jobs', {
                    params: {
                        categories: filters.categories,
                        salary: filters.salary,
                        page: currentPage,
                        per_page: jobsPerPage,
                    },
                });
                console.log("Received jobs:", response.data);
                setJobs(response.data.jobs);
                setCount(response.data.total_count);
                setTotalPages(response.data.total_pages);
            } catch (error : any) {
                console.error('Error fetching jobs:', error.response || error.message);
            }
        };

        fetchJobs();
    }, [filters, currentPage]);

    const handlePageChange = (page:number) => {
        if(page>= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="JobList-container">
            <h2>求人一覧</h2>
            <p className="count">該当件数： {count}件</p>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>カテゴリ：{job.category?.name}</p>
                        <p>年収:{job.salary}万円</p>
                    </li>
                ))}

                <div className="pagination">
                    <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="arrow-button">
                        &lt;
                    </button>

                    <div style={{ margin: '0 10px' }}>
                {[...Array(totalPages)].map((_, index)=>(
                    <button
                    key={index +1}
                    onClick={()=> handlePageChange(index + 1)}
                    style={{
                        margin: '0 5px',
                        fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                    }}
                    >
                        {index+1}
                    </button>
                ))}
        </div>

                    <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="arrow-button"
                    >
                        &gt;
                    </button>
                </div>
        </div>
    );
};

export default JobList;