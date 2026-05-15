import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, MessageCircle, Users } from 'lucide-react';

import { Logo } from '../components/Logo';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Header */}
      <header className="w-full max-w-5xl mx-auto p-4 md:p-6 flex justify-between items-center bg-white z-10">
        <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Logo className="w-8 h-8 rounded" />
          <span className="hidden sm:inline">SYB API</span>
        </div>
        <div className="flex gap-2 mx-2 md:gap-4 flex-shrink-0">
          <Link to="/login" className="text-sm md:text-base text-gray-600 hover:text-primary font-medium self-center px-2 py-2">
            تسجيل الدخول
          </Link>
          <Link to="/register" className="text-sm md:text-base bg-primary text-white px-3 md:px-5 py-2 md:py-2.5 rounded-lg hover:bg-primary-dark transition-colors">
            حساب جديد
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-10 md:mt-20 pb-20">
        <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8 text-xs md:text-sm font-medium">
          <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-gray-500 flex-shrink-0" />
          مشفر بالكامل. آمن تماماً.
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 md:mb-6 leading-tight">
          تحقق سهل وسريع من حوالاتك
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 mb-8 md:mb-10 max-w-2xl leading-relaxed">
          احصل على API لشام كاش بحيث يمكنك جلب سجل التحويلات والقيام بعملية تحويل من محافظك المربوطة.
        </p>

        {/* شام كاش logo on landing */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex flex-col items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4">
            <img src="https://i.ibb.co/sSsmypR/image.jpg" alt="شام كاش" className="h-12 object-contain rounded-lg" />
            <span className="text-sm text-gray-600 font-medium">شام كاش</span>
          </div>
        </div>

        <Link to="/register" className="bg-primary text-white px-8 py-3 md:px-10 md:py-4 rounded-xl text-base md:text-lg font-bold hover:bg-primary-dark transition-all transform hover:scale-105 shadow-md">
          ابدأ الآن
        </Link>
        
        <div className="mt-16 md:mt-24 w-full text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">بياناتك مشفرة ومحمية لدينا</h2>
          <p className="text-sm md:text-base text-gray-500 max-w-lg mx-auto">نحن نهتم بحمايتك أولاً، جميع بياناتك محمية لدينا عن طريق التشفير.</p>
        </div>

        {/* Why Trust Us Section */}
        <div className="mt-20 w-full max-w-3xl text-right px-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">لماذا تثق بنا؟</h2>
            <p className="text-center text-gray-500 mb-8 text-sm md:text-base">لأننا نبني علاقة ثقة — ما علينا فلا نخفي شيء</p>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-800 text-sm mb-1">موقعنا الجغرافي</div>
                  <div className="text-gray-600 text-sm">سوريا / حمص / تلبيسة</div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center mt-1 flex-shrink-0">
                  <span className="text-primary font-bold text-base">👨‍💻</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm mb-1">المبرمج</div>
                  <div className="text-gray-600 text-sm">أحمد عتون</div>
                </div>
              </div>
            </div>

            {/* Contact links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <a
                href="https://wa.me/212773963897"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                واتساب الأعمال
              </a>
              <a
                href="https://wa.me/963982559890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 text-white rounded-xl px-4 py-3 font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                واتساب شخصي
              </a>
              <a
                href="https://chat.whatsapp.com/DELXtdEh9ua5edFTupESNU"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-3 font-medium text-sm transition-colors"
              >
                <Users className="w-4 h-4" />
                مجتمع واتساب
              </a>
            </div>

            {/* Still not trusting? */}
            <div className="bg-white border border-yellow-200 rounded-xl p-5 text-center">
              <p className="font-bold text-gray-800 mb-2">أما زلت لا تثق بنا؟</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                لأن ثقتك غايتنا، سننشر عبر حساباتنا اشتراكات الناس على منصتنا. هذه الإجراءات ليست بغريبة، بل لبناء الثقة — شركتنا تسعى دائماً لإرضاء عملائها.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
