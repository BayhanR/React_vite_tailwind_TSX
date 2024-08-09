import React, { useState, useEffect } from 'react';
import './index.css'; // CSS dosyasını ekle

const App: React.FC = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState(true);
  const [profile,setProfile]=useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [profileOpacity,setProfileOpacity]=useState(0);
  const [loginOpacity, setLoginOpacity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [welcomeMessageVisible, setWelcomeMessageVisible] = useState(false);
  const [loadingOpacity, setLoadingOpacity] = useState(1);
  const [welcomeOpacity, setWelcomeOpacity] = useState(0);
  const [showLogout, setShowLogout] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [usernames, setUsernames] = useState<string[]>(["ako", "bko", "cko"]);
  const [passwords, setPasswords] = useState<string[]>(["123", "456", "789"]);
  const [emails, setEmails] = useState<string[]>(["ako@example.com", "bko@example.com", "cko@example.com"]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function notifCleaner(){
    setError('');
    setShowError(false);
    setSuccess('');
    setShowSuccess(false);
  }
  function newSln(){
    notifCleaner();
    setShowSignUp(true);
  }
  function generateRandomPassword(length = 12) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
  function resetPass(email: string){
    // E-posta adresinin geçerliliğini kontrol et

    if (!emailRegex.test(email)||!email) {
      console.log('2. durum');
      setError('Lütfen geçerli bir email adresi girin.');
      setShowError(true);
      console.log(showError);
      return false;
      } 
      // E-posta adresini bulun
      
      const emailIndex = emails.findIndex(e => e === email);
      console.log(emailIndex);
      passwords[emailIndex] = generateRandomPassword();
      if (emailIndex !== -1) {//ok
          console.log('Şifre değişti');
          setShowError(false);
          setSuccess('Yeni şifreniz mail yoluyla iletildi');    //ok
          setShowSuccess(true);
          console.log(200);
          return true;
      } else if(emailIndex===-1){
        console.log('3. durum');
          // E-posta adresi bulunamadıysa hata mesajı göster
          setError('E-posta adresi bulunamadı.');
          setShowError(true);
          return false;
      }
  }
  const handleSent = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!resetPass(email)) {
        // resetPass fonksiyonu false dönerse uyarı göster
        console.log('Olumsuz durum');
        return; // Hata mesajı zaten setError içinde ayarlandığı için buraya tekrar setError çağırmanıza gerek yok
    }


    setTimeout(() => {
        // Şifremi Unuttum veya Kayıt Ol ekranlarını kapat
  
        // Giriş ekranını aç
        setShowLogin(true);
        setLoginOpacity(0); // Giriş ekranını görünür yapmak için ilk başta 0 yapalım
        // Görünür hale gelmek için animasyonu başlat
        setForgotPassword(false);
        setTimeout(() => {
            setLoginOpacity(1); // Giriş ekranı nın opaklığını 1 yaparak görünür hale getir
        }, 100);
        // Küçük bir gecikme ile animasyonu başlat
    }, 100);
  };
  function registerUser(username: string, password: string, email: string):boolean{
  // Kullanıcı adı veya e-posta zaten var mı kontrol et
  if (usernames.includes(username) || emails.includes(email)) {
    console.log('Kullanıcı adı veya e-posta zaten mevcut'); // Hata logunu kontrol et
    setError('Kullanıcı adı veya e-posta zaten mevcut');
    setShowError(true);
    setShowSuccess(false); // Başarı mesajını gizle
    return false; // Kullanıcı adı veya e-posta zaten mevcut
  }

  // Yeni kullanıcı bilgilerini dizilere ekle
  setUsernames([...usernames, username]);
  setPasswords([...passwords, password]);
  setEmails([...emails, email]);
  setShowSuccess(true); // Başarı mesajını göster
  setSuccess('Kayıt başarılı'); // Başarı mesajını ayarla
  setShowError(false); // Hata mesajını gizle
  console.log('Kayıt başarılı'); // Başarı logunu kontrol et
  setTimeout(() => {
    return true; // Kayıt başarılı
  }, 300);
  return true;
  }



  const handleForgotPassword = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Şifre sıfırlama e-postası gönderildi.');
  };
  const bayhanfunc = (event: React.FormEvent) => {
    event.preventDefault();
    notifCleaner();
    console.log(usernames);
    console.log(emails);
    console.log(passwords);

    
    if (!email || !password) {
      setError('Email veya şifre eksik');
      setShowError(true);
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError('Lütfen geçerli bir email adresi girin.');
      setShowError(true);
      return;
    }
    const mailIndex = emails.findIndex(existingEmail => existingEmail === email);
    
    if (mailIndex === -1) {
      // Email mevcut değilse hata döndür
      setError("Hata: E-posta mevcut değil.");
      setShowError(true);
      return;
    }
    
    if (passwords[mailIndex] === password) {
      // Şifre doğruysa kullanıcı adını döndür
      setUsername(usernames[mailIndex]);
      console.log('Giriş başarılı');
      setError('');
      setShowError(false);
      setLoginOpacity(0);  // Giriş ekranı solması
      setTimeout(() => {
        setShowLogin(false);
        setLoading(true); // Login başarılı olduğunda yükleme animasyonunu başlat
      }, 1000);  // 1 saniye sonra login ekranı kapanacak
      
      setTimeout(() => {
        setProfile(true); // Login başarılı olduğunda yükleme animasyonunu başlat
      }, 1000);
    } else {
      // Şifre yanlışsa hata döndür
      setError('Geçersiz şifre.');
      setShowError(true);
    }
  };

  const handleSignUp = (event: React.FormEvent) => {

    event.preventDefault();
  console.log('hesap oluştur');
    notifCleaner();
    if (!email || !password || !confirmPassword||!username) {
      setError('Lütfen tüm alanları doldurun.');
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      setShowError(true);
      return;
    }
    if(!emailRegex.test(email)){
      setError('Geçerli bir eposta giriniz.');
      setShowError(true);
    }
    if (registerUser(username,password,email)) {
      console.log("Kayıt başarılı!");
    } else {
      setError('Kullanıcı adı veya e-posta zaten mevcut');
      setShowError(true);
      console.log('mevcut');
      return;
    }
    setTimeout(() => {
      setShowSignUp(false);
      setShowLogin(true);
      setLoginOpacity(0); // Giriş ekranını görünür yapmak için ilk başta 0 yapalım
      setTimeout(() => {
        setLoginOpacity(1); // Giriş ekranının opaklığını 1 yaparak görünür hale getir
      }, 100); // Küçük bir gecikme ile animasyonu başlat
    }, 100);
    console.log(usernames); // ["ako", "bko", "cko", "dko"]
    console.log(passwords); // ["123", "456", "789", "101112"]
    console.log(emails);
    notifCleaner();
    // Kayıt işlemini gerçekleştirin
  };

  useEffect(() => {
    if (loading) {
      setLoadingOpacity(1); // Yükleniyor ekranı görünür olacak
      setTimeout(() => {
        setLoadingOpacity(0); // Yükleniyor ekranı sönerek kaybolacak
        setTimeout(() => {
          setLoading(false);
          setWelcomeOpacity(1); // Hoşgeldin mesajı görünür
          setWelcomeMessageVisible(true);
        }, 1000); // 1 saniye sönme süresi
      }, 2000); // 2 saniye sonra yükleniyor ekranını kapat 
      setTimeout(() => {
        setProfileOpacity(1);
        setProfile(true)
      }, 300);     
    }
  }, [loading]);

  useEffect(() => {
    if (welcomeMessageVisible) {
      setTimeout(() => {
        setWelcomeOpacity(0); // Hoşgeldin mesajını kaybet
        setTimeout(() => setWelcomeMessageVisible(false), 1000); // 1 saniye sonra mesajı tamamen kaldır
      }, 2000); // Hoşgeldin mesajını 2 saniye göster
    }
    setShowLogout(true);
  }, [welcomeMessageVisible]);

  const handleLogout = () => {
    setShowLogout(false); // Çıkış butonunu gizle
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setWelcomeMessageVisible(false);
    setLoading(false);
  
    // Profil ekranını animasyonla kapatma
    setProfileOpacity(0); // Profil ekranını kaybolma animasyonuna başlat
    setTimeout(() => {
      setProfile(false); // Profil ekranını tamamen gizle
      setShowLogin(true); // Login ekranını göster
      
      // Login ekranını animasyonla görünür hale getirme
      setTimeout(() => {
        setLoginOpacity(1); // Login ekranını animasyonla görünür hale getir
      }, 100); // Profil ekranının kaybolma animasyonuyla uyumlu bir gecikme
    }, 1000); // Animasyon süresi ile uyumlu bir gecikme
  };
  const handleForgotPasswordClick = () => {
    setLoginOpacity(0); // Login ekranını solması
    setTimeout(() => {
      setForgotPassword(true); // Şifre sıfırlama ekranını göster
    }, 300); // 1 saniye sonra şifre sıfırlama ekranını göster
  };
  const handleReturnClick = () => {
    
    setShowSuccess(false);
    if (forgotPassword || showSignUp) {
      
      // Formların kaybolma animasyonunu başlatmak için önce görünürlük durumunu değiştirelim
      setLoginOpacity(0);
  
      // Formların kaybolma animasyonunun süresi boyunca bekle
      setTimeout(() => {
        // Şifremi Unuttum veya Kayıt Ol ekranlarını kapat
        setForgotPassword(false);
        setShowSignUp(false);
        
        
        // Giriş ekranını aç
        setShowLogin(true);
        setLoginOpacity(0); // Giriş ekranını görünür yapmak için ilk başta 0 yapalım
  
        // Görünür hale gelmek için animasyonu sbaşlat
        setTimeout(() => {
          setLoginOpacity(1); // Giriş ekranının opaklığını 1 yaparak görünür hale getir
        }, 100); // Küçük bir gecikme ile animasyonu başlat
      }, 100); // Kaybolma animasyonunun süresi
    }
    notifCleaner();
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <div className={`flex items-center justify-center min-h-screen bg-gray-100 transition-opacity ${loadingOpacity === 1 ? 'opacity-100' : 'opacity-0'} duration-1000`}>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-ako border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      ) : welcomeMessageVisible ? (
        <div className={`flex items-center justify-center min-h-screen bg-gray-100 transition-opacity ${welcomeOpacity === 1 ? 'opacity-100' : 'opacity-0'} duration-1000`}>
          <h1 className="text-3xl font-bold text-ako">Hoşgeldin, {username}!</h1>
        </div>
      ) :  forgotPassword ? (
        <div className={`relative w-full max-w-md p-8 bg-white text-gray-900 rounded-lg shadow-lg transition-opacity ${loginOpacity === 1 ? 'fade-out' : 'fade-in'}`}>
          <form onSubmit={handleForgotPassword}>

            <h2 className="text-2xl font-bold mb-4">Şifremi Unuttum</h2>
            {showError && error && (
    <div className="mb-4 p-3 text-white bg-red-600 rounded-md">
      {error}
    </div>
  )}
            <div className="mb-4">
              <label htmlFor="resetEmail" className="block text-sm font-medium mb-1">E-posta</label>
              <input
                type="email"
                id="resetEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                placeholder="example@example.com"
              />
            </div>
            <button
              type="button"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSent}           
           >
              Şifre Yenileme E-postası Gönder
            </button>
            <button
              type="button"
              onClick={handleReturnClick}
              className="w-full py-2 px-4 mt-4 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Geri Dön
            </button>
          </form>
        </div>
      ) :profile ? (
        <div className={`flex flex-col h-screen transition-opacity ${profileOpacity === 0 ? 'fade-out' : 'fade-in'}`}>
          <header className="bg-blue-600 text-white p-4 shadow-md w-full px-full">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Web Sitem</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-blue-300">Ana Sayfa</a></li>
                <li><a href="#about" className="hover:text-blue-300">Hakkımızda</a></li>
                <li><a href="#services" className="hover:text-blue-300">Hizmetler</a></li>
                <li><a href="#contact" className="hover:text-blue-300">İletişim</a></li>
              </ul>
            </nav>
          </div>
        </header>
  
        <main className="flex-grow p-8">
          <section className="text-center py-16">
            <h2 className="text-4xl font-bold mb-4">Hoşgeldiniz!</h2>
            <p className="text-lg text-gray-700">
              Web sitemiz, en iyi hizmetleri sunmak için buradadır. Daha fazla bilgi için aşağıdaki bölümlere göz atabilirsiniz.
            </p>
          </section>
  
          <section id="about" className="py-16 bg-white shadow-md rounded-lg">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-center">Hakkımızda</h2>
              <p className="text-lg text-gray-700">
                Burada şirketinizin tarihini, misyonunu ve vizyonunu tanıtabilirsiniz. 
              </p>
            </div>
          </section>
  
          <section id="services" className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-center">Hizmetlerimiz</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Hizmet 1</h3>
                  <p className="text-gray-700">Hizmet 1 hakkında detaylı bilgi.</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Hizmet 2</h3>
                  <p className="text-gray-700">Hizmet 2 hakkında detaylı bilgi.</p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Hizmet 3</h3>
                  <p className="text-gray-700">Hizmet 3 hakkında detaylı bilgi.</p>
                </div>
              </div>
            </div>
          </section>
  
          <section id="contact" className="py-16 bg-gray-200">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-center">İletişim</h2>
              <form className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Adınız</label>
                  <input
                    type="text"
                    id="name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Adınız"
                    required
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="email@example.com"
                    required
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Mesajınız</label>
                  <textarea
                    id="message"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    rows={4}
                    placeholder="Mesajınız"
                    required
                  ></textarea>
                </div>
  
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                >
                  Gönder
                </button>
              </form>
            </div>
          </section>
        </main>
  
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>© 2024 Web Sitem. Tüm Hakları Saklıdır.</p>
        </footer>
      </div>): showSignUp ? (
        <div className={`relative w-full max-w-md p-8 bg-white text-gray-900 rounded-lg shadow-lg fade-in ${loginOpacity === 1 ? 'show' : ''}`}>
<form onSubmit={handleSignUp}>
  <h2 className="text-2xl font-bold mb-4">Hesap Oluştur</h2>
  <div className="mb-4">

    <label htmlFor="signUpUsername" className="block text-sm font-medium mb-1">Kullanıcı Adı</label>
    <input
      type="text"
      id="signUpUsername"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
      placeholder="Kullanıcı Adı"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="signUpEmail" className="block text-sm font-medium mb-1">E-posta</label>
    <input
      type="email"
      id="signUpEmail"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
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
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
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
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
      placeholder="••••••••"
    />
  </div>
  {showError && error && (
    <div className="mb-4 p-3 text-white bg-red-600 rounded-md">
      {error}
    </div>
  )}
  <button
    type="submit"
    onClick={notifCleaner}
    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Hesap Oluştur
  </button>
  <button
    type="button"
    onClick={handleReturnClick}
    className="w-full py-2 px-4 mt-4 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  >
    Geri Dön
  </button>
</form>

        </div>
      ) : (
        <div className={`relative w-full max-w-md p-8 bg-white text-gray-900 rounded-lg shadow-lg transition-opacity`} style={{ opacity: loginOpacity }}>
          <form onSubmit={bayhanfunc}>
            <img
              src="./public/ako_logo.png"
              alt="Logo"
              className="mx-auto w-48 h-auto mb-4"
            />
              {showSuccess && success && (
  <div className="mb-4 p-3 text-white bg-green-600 rounded-md">
    {success}
  </div>
)}
            {showError && error && (
              <div className={`mb-4 p-3 text-white bg-red-600 rounded-md transition-opacity ${loginOpacity === 1 ? 'opacity-100' : 'opacity-0'}`}>
                {error}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
              <input 
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black`}
                placeholder="example@example.com"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">Şifre</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                placeholder="••••••••"
              />
            </div>
            
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-900">
                Beni Hatırla
              </label>
            </div>

            <button 
              type="button"
              onClick={bayhanfunc}
              className="w-full py-2 px-4 bg-ako text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Giriş Yap
            </button>

            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <a href="#" onClick={newSln} className="font-medium text-ako hover:text-blue-600">
                Hesap Oluştur
              </a>
              <a href="#" onClick={handleForgotPasswordClick} className="font-medium text-ako hover:text-blue-600">
                Şifremi Unuttum
              </a>
            </div>
          </form>
        </div>
      )}
      {showLogout && !showLogin && !loading && (
        <button onClick={handleLogout} className="absolute top-4 right-4 px-4 py-2 text-xl text-red-600 bg-transparent border-none cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5" />
</svg>

        </button>
      )}
    </div>
  );
};

export default App;
