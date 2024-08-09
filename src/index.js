import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // CSS dosyasını ekle

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', { email, password });
      console.log('Kayıt başarılı:', response.data);
      setError('');
      setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Kayıt başarısız:', error);
      setError('Kayıt başarısız. Tekrar deneyin.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hesap Oluştur</h1>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label htmlFor="signUpEmail" className="block text-sm font-medium mb-1">E-posta</label>
          <input
            type="email"
            id="signUpEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="example@example.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="signUpPassword" className="block text-sm font-medium mb-1">Şifre</label>
          <input
            type="password"
            id="signUpPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="••••••••"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Şifreyi Onayla</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="••••••••"
          />
        </div>
        {error && <div className="mb-4 p-3 text-white bg-red-600 rounded-md">{error}</div>}
        {success && <div className="mb-4 p-3 text-white bg-green-600 rounded-md">Kayıt başarılı!</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Hesap Oluştur
        </button>
      </form>
    </div>
  );
};

export default App;
