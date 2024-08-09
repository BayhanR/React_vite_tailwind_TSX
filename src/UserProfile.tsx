interface UserProfileProps {
    userName: string;
    userEmail: string;
  }
  
  const UserProfile: React.FC<UserProfileProps> = ({ userName, userEmail }) => {
    return (
      <div className="relative w-full max-w-md p-8 bg-white text-gray-900 rounded-lg shadow-lg transition-opacity">
        <h1 className="text-3xl font-bold mb-4">Profil</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Kullanıcı Adı</label>
          <p className="text-lg">{userName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">E-posta</label>
          <p className="text-lg">{userEmail}</p>
        </div>
        <button
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => console.log('Profil güncellenebilir')}
        >
          Profil Güncelle
        </button>
      </div>
    );
  };
  