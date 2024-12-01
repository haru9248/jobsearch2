import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import JobList from '../components/JobList';
import '../css/Home.css';

const Home:React.FC = () => {
    const [filters, setFilters] = useState<{ categories: number[]; salary: number | null}>({categories:[1, 2],salary: 3000000,
    });

    return(
        <div className="home-container">
            <Sidebar onFilterChange={setFilters} />
            <JobList filters={filters}/>
        </div>
    );
};

export default Home;