import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import pollService from './services/polls';

function PollDetails() {
    const { id } = useParams(); // Get poll ID from URL
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userAnswer, setUserAnswer] = useState(null); // Track user's answer
    const [answers, setAnswers] = useState([]); // Track all submitted answers
    const [yesCount, setYesCount] = useState(0); // Count of "Yes" answers
    const [noCount, setNoCount] = useState(0); // Count of "No" answers

    useEffect(() => {
        // Fetch poll details based on the ID
        pollService.get(id)
            .then(response => {
                setPoll(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch poll details:", error);
                alert("Failed to fetch poll details.");
                setLoading(false);
            });
    }, [id]);

    const handleAnswer = (answer) => {
        setUserAnswer(answer);
        // Update answers list
        const newAnswer = {
            pollId: poll.id,
            answer: answer,
        };
        setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

        // Update the count of "Yes" and "No" answers
        if (answer === 'Yes') {
            setYesCount(yesCount + 1);
        } else {
            setNoCount(noCount + 1);
        }

        // Optionally, send the answer to the backend if needed
        // pollService.submitAnswer(poll.id, answer);
    };

    // Calculate percentages
    const totalAnswers = yesCount + noCount;
    const yesPercentage = totalAnswers === 0 ? 0 : (yesCount / totalAnswers) * 100;
    const noPercentage = 100 - yesPercentage;

    if (loading) return <p>Loading...</p>;
    if (!poll) return <p>Poll not found.</p>;

    return (
        <div>
            <h2>Poll Details</h2>
            <h3>{poll.name}</h3>
            <p>{poll.question}</p>

            {/* User's answer options */}
            <div>
                <p>Choose your answer:</p>
                <button onClick={() => handleAnswer('Yes')}>Yes</button>
                <button onClick={() => handleAnswer('No')}>No</button>
            </div>

            {/* Displaying the user's answer */}
            {userAnswer && (
                <p>Your answer: <strong>{userAnswer}</strong></p>
            )}

            {/* Displaying the answer split as a rectangle */}
            <h4>Answer Split:</h4>
            {totalAnswers === 0 ? (
                <div>No answers to display</div>
            ) : (
                <div style={{ width: '100%', height: '50px', display: 'flex', border: '1px solid black' }}>
                    <div
                        style={{
                            width: `${yesPercentage}%`,
                            backgroundColor: 'green',
                        }}
                    />
                    <div
                        style={{
                            width: `${noPercentage}%`,
                            backgroundColor: 'red',
                        }}
                    />
                </div>
            )}

            {/* Back to poll list */}
            <Link to="/">Back to Polls</Link>
        </div>
    );
}

export default PollDetails;
