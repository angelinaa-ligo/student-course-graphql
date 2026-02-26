import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { SIGNUP_STUDENT } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  studentNumber: '',
  password: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  phoneNumber: '',
  email: '',
  program: ''
});
  const [error, setError] = useState('');

  const [signupStudent, { loading }] = useMutation(SIGNUP_STUDENT);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signupStudent({
        variables: formData
      });

      alert('Account created successfully!');
      navigate('/');
    } catch (err) {
      setError('Error creating account');
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
  <input name="studentNumber" placeholder="Student Number" onChange={handleChange} required />
  <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
  <input name="firstName" placeholder="First Name" onChange={handleChange} />
  <input name="lastName" placeholder="Last Name" onChange={handleChange} />
  <input name="address" placeholder="Address" onChange={handleChange} />
  <input name="city" placeholder="City" onChange={handleChange} />
  <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
  <input name="email" placeholder="Email" onChange={handleChange} />

  <select
    name="program"
    value={formData.program}
    onChange={handleChange}
    required
  >
    <option value="">Select a program</option>
    <option value="Software Engineering">Software Engineering</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Biology">Biology</option>
    <option value="Business">Business</option>
  </select>

  <button type="submit" disabled={loading}>
    {loading ? 'Creating...' : 'Create Account'}
  </button>

  {error && <p style={{ color: 'red' }}>{error}</p>}
</form>
    </div>
  );
}