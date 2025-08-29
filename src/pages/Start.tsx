import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SocialMediaEntranceTailwind = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* هدر */}
      <header className="p-6 text-primary-600 bg-white">
        <h1 className={`flex flex-center gap-5 text-4xl font-bold text-center transition-all duration-1000 delay-300 ${isVisible ? 'scale-100' : 'scale-0'}`}>
          <img src="/assets/images/logo.png" alt="logo" className="" /> اسنپ گرام
        </h1>
      </header>

      {/* محتوا */}
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* کارت‌ها با تمرکز بر عکس */}
          <div
            className={`
              bg-white rounded-2xl p-6 shadow-2xl transform transition-all duration-700
              hover:scale-105 hover:-translate-y-1
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="text-4xl mb-4">📸</div>
            <h2 className="text-xl font-semibold mb-2">بارگذاری عکس</h2>
            <p className="text-gray-600">
              عکس‌های خود را به راحتی آپلود و مدیریت کنید
            </p>
          </div>
          
          <div
            className={`
              bg-white rounded-2xl p-6 shadow-2xl transform transition-all duration-700
              hover:scale-105 hover:-translate-y-1
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-xl font-semibold mb-2">اشتراک‌گذاری</h2>
            <p className="text-gray-600">
              عکس‌های خود را با دیگران به اشتراک بگذارید
            </p>
          </div>
          
          <div
            className={`
              bg-white rounded-2xl p-6 shadow-2xl transform transition-all duration-700
              hover:scale-105 hover:-translate-y-1
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="text-4xl mb-4">🖼️</div>
            <h2 className="text-xl font-semibold mb-2">گالری</h2>
            <p className="text-gray-600">
              تمام عکس‌های خود را در یک گالری منظم مشاهده کنید
            </p>
          </div>
        </div>

        {/* دکمه */}
        <div className="text-center mt-12">
          <Link to="/sign-in">
            <button
              className={`
                bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg
                transform transition-all duration-700
                hover:scale-110 hover:shadow-xl
                ${isVisible ? 'scale-100' : 'scale-0'}
              `}
              style={{ transitionDelay: '600ms' }}
            >
              شروع به اشتراک‌گذاری عکس 🚀
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SocialMediaEntranceTailwind;