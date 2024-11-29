import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pollService from './services/polls';
import LoginPage from './LoginPage';
import PollDetails from './polldetails';

function App() {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        pollService.getAll()
            .then(response => {
                setPolls(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch polls:", error);
                alert("Failed to fetch polls. Please refresh the page.");
            });
    }, []);

    return (
        <div className="App">
            <h1>POLL APP</h1>
            <Routes>
                {/* Strona główna z listą ankiet */}
                <Route 
                    path="/" 
                    element={
                        <>
                            <LoginPage setPolls={setPolls} />
                            <h2>Existing Polls:</h2>
                            <ul>
                                {polls.map((poll) => (
                                    <li key={poll.id || poll.name}>
                                        <Link to={`/polls/${poll.id}`}>
                                            <strong>{poll.name}</strong>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    } 
                />
                {/* Strona szczegółów ankiety */}
                <Route path="/polls/:id" element={<PollDetails />} />
            </Routes>
        </div>
    );
}

export default App;
