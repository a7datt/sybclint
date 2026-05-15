import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, MessageCircle, Users, Zap, Lock, Code2, ArrowRight } from 'lucide-react';

import { Logo } from '../components/Logo';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white" dir="rtl">

      {/* ===== Header / Navbar ===== */}
      <header className="w-full max-w-5xl mx-auto p-4 md:p-6 flex justify-between items-center bg-white z-10 sticky top-0 border-b border-gray-100 backdrop-blur">
        <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Logo className="w-8 h-8 rounded" />
          <span className="text-primary">SYB API</span>
        </div>
        <nav className="flex gap-2 md:gap-4 items-center">
          <Link to="/docs" className="hidden md:inline text-sm text-gray-500 hover:text-primary font-medium transition-colors">
            التوثيق
          </Link>
          <Link to="/login" className="text-sm md:text-base text-gray-600 hover:text-primary font-medium px-2 py-2 transition-colors">
            تسجيل الدخول
          </Link>
          <Link to="/register" className="text-sm md:text-base bg-primary text-white px-3 md:px-5 py-2 md:py-2.5 rounded-lg hover:bg-primary-dark transition-all shadow-sm">
            حساب جديد
          </Link>
        </nav>
      </header>

      {/* ===== Hero Section ===== */}
      <main className="flex-1 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-12 md:mt-20 pb-24">

        {/* Badge */}
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full mb-8 text-xs md:text-sm font-medium">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          مشفر بالكامل · آمن تماماً · موثوق من المطورين
        </div>

        {/* H1 - Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-5 leading-tight">
          SYB API
          <span className="block text-gray-700 text-3xl md:text-4xl mt-2 font-bold">
            واجهة برمجية لشام كاش
          </span>
        </h1>

        {/* H2 - Subheading */}
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
          اربط تطبيقك بخدمة <strong className="text-gray-700">شام كاش</strong> بكل سهولة.
          اجلب سجل التحويلات، أرسل الحوالات، وتحكم بمحافظك — كل ذلك عبر API بسيط وموثوق.
        </p>

        {/* شام كاش logo */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex flex-col items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-8 py-5 shadow-sm">
            <img src="https://i.ibb.co/sSsmypR/image.jpg" alt="شام كاش - خدمة التحويلات المالية في سوريا" className="h-12 object-contain rounded-lg" />
            <span className="text-sm text-gray-500 font-medium">مدعوم رسمياً بـ شام كاش</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 md:px-10 md:py-4 rounded-xl text-base md:text-lg font-bold hover:bg-primary-dark transition-all transform hover:scale-105 shadow-md"
          >
            ابدأ الآن مجاناً
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Free Trial Notice */}
        <div className="flex items-center justify-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-5 py-3 rounded-xl text-sm font-medium mb-6">
          <span className="text-lg">🎁</span>
          <span>كل حساب جديد يحصل على <strong>فترة مجانية مدة 24 ساعة</strong> — جرّب الخدمة بدون أي تكلفة!</span>
        </div>

        {/* ===== Features Section ===== */}
        <section className="mt-20 w-full max-w-3xl" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
            كل ما تحتاجه في مكان واحد
          </h2>
          <p className="text-gray-500 mb-10 text-sm md:text-base">
            SYB API يوفر لك أدوات قوية للتكامل مع شام كاش بدون تعقيد.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-right">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col gap-3">
              <Zap className="w-6 h-6 text-blue-500" />
              <h3 className="font-bold text-gray-800">سرعة عالية</h3>
              <p className="text-sm text-gray-500">استجابة API فورية لجلب بيانات التحويلات وتنفيذ العمليات في الوقت الفعلي.</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col gap-3">
              <Lock className="w-6 h-6 text-green-500" />
              <h3 className="font-bold text-gray-800">أمان وتشفير</h3>
              <p className="text-sm text-gray-500">بياناتك محمية بتشفير من طرف إلى طرف. لا نخزن كلمات المرور بأي شكل مقروء.</p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex flex-col gap-3">
              <Code2 className="w-6 h-6 text-purple-500" />
              <h3 className="font-bold text-gray-800">توثيق شامل</h3>
              <p className="text-sm text-gray-500">توثيق تقني كامل مع أمثلة عملية تساعد المطورين على البدء خلال دقائق.</p>
            </div>
          </div>
        </section>

        {/* ===== Trust Section ===== */}
        <section className="mt-20 w-full max-w-3xl text-right" aria-labelledby="trust-heading">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 md:p-10">
            <h2 id="trust-heading" className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">
              لماذا تثق بنا؟
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm md:text-base">
              نبني علاقة ثقة حقيقية — شفافية كاملة، لا نخفي شيئاً
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-800 text-sm mb-1">موقعنا الجغرافي</div>
                  <div className="text-gray-600 text-sm">سوريا / حمص / </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
                <span className="text-xl mt-0.5">👨‍💻</span>
                <div>
                  <div className="font-bold text-gray-800 text-sm mb-1">المطوّر</div>
                  <div className="text-gray-600 text-sm">أحمد عتون</div>
                </div>
              </div>
            </div>

            {/* Contact Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <a
                href="https://wa.me/212773963897"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب الأعمال - SYB API"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                واتساب الأعمال
              </a>
              <a
                href="https://wa.me/963982559890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب شخصي - أحمد عتون"
                className="flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 text-white rounded-xl px-4 py-3 font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                واتساب شخصي
              </a>
              <a
                href="https://whatsapp.com/channel/0029Vb7bKOWLY6d7CGPwx22s"
                target="_blank"
                rel="noopener noreferrer"
                aria-label=" قناة الوتساب- SYB API"
                className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl px-4 py-3 font-medium text-sm transition-colors"
              >
                <Users className="w-4 h-4" />
                قناة واتساب
              </a>
            </div>

            {/* Trust note */}
            <div className="bg-white border border-yellow-200 rounded-xl p-5 text-center">
              <p className="font-bold text-gray-800 mb-2">أما زلت غير متأكد؟</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                نشارك اشتراكات عملائنا على منصتنا وقنواتنا لأن الشفافية أساس ثقتنا.
                تواصل معنا مباشرة في أي وقت — فريقنا دائماً هنا لمساعدتك.
              </p>
            </div>
          </div>
        </section>

        {/* ===== CTA Bottom ===== */}
        <section className="mt-20 w-full max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            جاهز تبدأ؟
          </h2>
          <p className="text-gray-500 mb-8 text-sm md:text-base">
            أنشئ حسابك مجاناً الآن واحصل على مفتاح API الخاص بك في دقائق.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg"
          >
            ابدأ مجاناً الآن
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="w-full border-t border-gray-100 mt-16 py-8 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-gray-600">SYB API</span> — جميع الحقوق محفوظة
        </p>
        <p className="mt-1 text-xs">
          واجهة برمجية متخصصة لخدمة شام كاش · سوريا
        </p>
      </footer>

    </div>
  );
}
