import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { LOGIN_STUDENT } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const [loginStudent, { loading }] = useMutation(LOGIN_STUDENT);

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await loginStudent({
        variables: { studentNumber, password }
      });

      localStorage.setItem('token', data.loginStudent.token);
      localStorage.setItem('student', JSON.stringify(data.loginStudent.student));

      navigate('/dashboard');
    } catch (err) {
      setError('Invalid student number or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p>
          Don’t have an account? <a href="/signup">Sign up here</a>
        </p>
      </form>
    </div>
  );
}