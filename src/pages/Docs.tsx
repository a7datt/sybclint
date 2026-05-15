import { Copy, ChevronDown } from 'lucide-react';

export default function Docs() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  const baseUrl = window.location.origin;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-[#0936AD] mb-2">توثيق API</h1>
        <p className="text-gray-500">واجهة برمجية للوصول إلى محافظك من أي تطبيق خارجي</p>
      </div>

      {/* Auth */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
        <h2 className="font-bold text-xl">المصادقة</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          أضف مفتاح API في ترويسة كل طلب:
        </p>
        
        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm relative" dir="ltr">
          <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard('Authorization: Bearer sk_xxx')}><Copy className="w-4 h-4"/></div>
          <pre><code>Authorization: Bearer sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</code></pre>
        </div>
        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm relative" dir="ltr">
          <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard('X-Api-Key: sk_xxx')}><Copy className="w-4 h-4"/></div>
          <pre><code>أو بديلاً: X-Api-Key: sk_xxx...</code></pre>
        </div>
        
        <div className="mt-4">
          <span className="text-sm text-gray-500 font-medium tracking-wide">العنوان الأساسي لجميع الطلبات:</span>
          <div className="bg-gray-100 text-[#0936AD] rounded-lg p-3 font-mono text-sm relative mt-2 border border-gray-200" dir="ltr">
            {baseUrl}/api
          </div>
        </div>
      </div>

      {/* Endpoint: Wallets */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs font-mono">GET</span>
          <h2 className="font-bold text-lg">المحافظ</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-gray-100 p-3 rounded font-mono text-sm font-medium border border-gray-200" dir="ltr">/v1/wallets</div>
          <p className="text-sm text-gray-600 leading-relaxed">يعيد جميع المحافظ المربوطة بحساب صاحب المفتاح. تختلف حقول كل محفظة حسب المزوّد.</p>
          
          <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white">
             <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="font-semibold text-sm text-[#0936AD]">عرض مثال للطلب والرد (JSON)</span>
               <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
             </summary>
             <div className="p-4 border-t border-gray-200 space-y-4">
               <div>
                 <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">مثال الطلب</h3>
                 <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto relative" dir="ltr">
                     <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard(`curl ${baseUrl}/api/v1/wallets -H "Authorization: Bearer sk_xxx"`)}><Copy className="w-4 h-4"/></div>
                     <pre><code>curl {baseUrl}/api/v1/wallets{'\n'}-H "Authorization: Bearer sk_xxx"</code></pre>
                 </div>
               </div>
               <div>
                 <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">الرد الناجح</h3>
                 <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto" dir="ltr">
                 <pre><code>{`[
  {
    "id": "f9a0738f-eb67-492a-b4ba-e3f08238fac7",
    "provider": "shamcash",
    "providerDisplayName": "ShamCash",
    "label": "محمد أحمد علي",
    "phone": "0991234567",
    "walletAddress": "e5289b724c3a3a47581b575bfdf6cd53",
    "accountNumber": "SC-00012345",
    "region": "دمشق",
    "status": "active"
  },
  {
    "id": "a3c12f88-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
    "provider": "syriatel",
    "providerDisplayName": "Syriatel Cash",
    "label": "محمد",
    "phone": "0931234567",
    "cashCode": "12345678",
    "status": "active"
  }
]`}</code></pre>
                 </div>
               </div>
             </div>
          </details>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
         <h2 className="text-2xl font-bold text-[#0936AD] mb-6">شام كاش</h2>
      </div>

      {/* Endpoint: Shamcash Balance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs font-mono">GET</span>
          <h2 className="font-bold text-lg">الرصيد</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-gray-100 p-3 rounded font-mono text-sm font-medium border border-gray-200" dir="ltr">/v1/wallets/shamcash/{"{walletAddress}"}/balance</div>
          
          <div>
            <h3 className="font-semibold text-sm mb-3">المعاملات</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
               <table className="w-full text-sm text-right">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                     <tr>
                        <th className="px-4 py-3 font-medium">المعاملة</th>
                        <th className="px-4 py-3 font-medium">النوع</th>
                        <th className="px-4 py-3 font-medium">الحالة</th>
                        <th className="px-4 py-3 font-medium">الوصف</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     <tr>
                        <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">walletAddress</td>
                        <td className="px-4 py-3 font-mono text-blue-600">string</td>
                        <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                        <td className="px-4 py-3 text-gray-600">id المحفظة (UUID) أو عنوان المحفظة (32 hex) أو رقم الحساب</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>

          <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white">
             <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="font-semibold text-sm text-[#0936AD]">عرض مثال للطلب والرد (JSON)</span>
               <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
             </summary>
             <div className="p-4 border-t border-gray-200 space-y-4">
               <div>
                 <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">مثال الطلب</h3>
                 <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto relative" dir="ltr">
                     <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard(`curl ${baseUrl}/api/v1/wallets/shamcash/e5289b724c3a3a47581b575bfdf6cd53/balance -H "Authorization: Bearer sk_xxx"`)}><Copy className="w-4 h-4"/></div>
                     <pre><code>curl {baseUrl}/api/v1/wallets/shamcash/e5289b724c3a3a47581b575bfdf6cd53/balance{'\n'}-H "Authorization: Bearer sk_xxx"</code></pre>
                 </div>
               </div>
               <div>
                 <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">الرد الناجح</h3>
                 <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto" dir="ltr">
                 <pre><code>{`[
  { "currency": "USD", "amount": 4.1, "label": null },
  { "currency": "SYP", "amount": 1606.5, "label": null },
  { "currency": "EUR", "amount": 0, "label": null }
]`}</code></pre>
                 </div>
               </div>
             </div>
          </details>
        </div>
      </div>

      {/* Endpoint: Shamcash Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs font-mono">GET</span>
          <h2 className="font-bold text-lg">سجل التحويلات (Transactions)</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-gray-100 p-3 rounded font-mono text-sm font-medium border border-gray-200" dir="ltr">/v1/wallets/shamcash/{"{walletAddress}"}/transactions</div>
          <p className="text-sm text-gray-600 leading-relaxed">يدعم فلتر الاتجاه: in (وارد) · out (صادر) · all (الكل، افتراضي)</p>
          
          <div>
            <h3 className="font-semibold text-sm mb-3">المعاملات</h3>
            <div className="border border-gray-200 rounded-lg overflow-x-auto">
               <table className="w-full text-sm text-right">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                     <tr>
                        <th className="px-4 py-3 font-medium">المعاملة</th>
                        <th className="px-4 py-3 font-medium">النوع</th>
                        <th className="px-4 py-3 font-medium">الحالة</th>
                        <th className="px-4 py-3 font-medium">الوصف</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     <tr>
                        <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">walletAddress</td>
                        <td className="px-4 py-3 font-mono text-blue-600">string</td>
                        <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                        <td className="px-4 py-3 text-gray-600">id المحفظة (UUID) أو عنوان المحفظة (32 hex) أو رقم الحساب</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">direction</td>
                        <td className="px-4 py-3 font-mono text-blue-600">string</td>
                        <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">اختياري</span></td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-sm" dir="ltr">in | out | all <span className="font-sans text-gray-500">(افتراضي: all)</span></td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>

          <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white">
             <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="font-semibold text-sm text-[#0936AD]">عرض مثال للطلب والرد (JSON)</span>
               <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
             </summary>
             <div className="p-4 border-t border-gray-200 space-y-4">
               <div>
                 <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">مثال - الحركات الواردة فقط</h3>
                 <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto relative" dir="ltr">
                     <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard(`curl "${baseUrl}/api/v1/wallets/shamcash/e5289b724c3a3a47581b575bfdf6cd53/transactions?direction=in" -H "Authorization: Bearer sk_xxx"`)}><Copy className="w-4 h-4"/></div>
                     <pre><code>curl "{baseUrl}/api/v1/wallets/shamcash/e5289b724c3a3a47581b575bfdf6cd53/transactions?direction=in"{'\n'}-H "Authorization: Bearer sk_xxx"</code></pre>
                 </div>
               </div>
               <div>
                 <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">الرد الناجح</h3>
                 <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto" dir="ltr">
                 <pre><code>{`[
  {
    "id": "202235201",
    "type": "credit",
    "amount": 1600,
    "currency": "SYP",
    "counterparty": "حسين أحمد يوسف",
    "description": null,
    "status": null,
    "occurredAt": "2026-04-30T20:17:29"
  }
]`}</code></pre>
                 </div>
               </div>
             </div>
          </details>
        </div>
      </div>

      {/* Endpoint: Shamcash Transfer */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded text-xs font-mono">POST</span>
          <h2 className="font-bold text-lg">تحويل مالي (Transfer)</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-gray-100 p-3 rounded font-mono text-sm font-medium border border-gray-200" dir="ltr">/v1/wallets/shamcash/{"{walletAddress}"}/transfer</div>
          
          <div>
            <h3 className="font-semibold text-sm mb-3">معاملات المسار (Path Parameter)</h3>
            <div className="border border-gray-200 rounded-lg overflow-x-auto">
               <table className="w-full text-sm text-right">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                     <tr>
                        <th className="px-4 py-3 font-medium">المعاملة</th>
                        <th className="px-4 py-3 font-medium">النوع</th>
                        <th className="px-4 py-3 font-medium">الحالة</th>
                        <th className="px-4 py-3 font-medium">الوصف</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     <tr>
                        <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">walletAddress</td>
                        <td className="px-4 py-3 font-mono text-blue-600">string</td>
                        <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                        <td className="px-4 py-3 text-gray-600">id المحفظة (UUID) أو عنوان المحفظة (32 hex) أو رقم الحساب</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">جسم الطلب (JSON Request Body)</h3>
            <div className="border border-gray-200 rounded-lg overflow-x-auto">
               <table className="w-full text-sm text-right">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                     <tr>
                        <th className="px-4 py-3 font-medium">الحقل</th>
                        <th className="px-4 py-3 font-medium">النوع</th>
                        <th className="px-4 py-3 font-medium">الحالة</th>
                        <th className="px-4 py-3 font-medium">الوصف</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     <tr>
                        <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">recipientAddress</td>
                        <td className="px-4 py-3 font-mono text-blue-600">string</td>
                        <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                        <td className="px-4 py-3 text-gray-600">عنوان محفظة المستفيد</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">currencyId</td>
                        <td className="px-4 py-3 font-mono text-blue-600">number</td>
                        <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-sm" dir="ltr">1=USD · 2=SYP · 3=EUR</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">amount</td>
                        <td className="px-4 py-3 font-mono text-blue-600">number</td>
                        <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                        <td className="px-4 py-3 text-gray-600">المبلغ (موجب)</td>
                     </tr>
                     <tr>
                        <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">note</td>
                        <td className="px-4 py-3 font-mono text-blue-600">string</td>
                        <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">اختياري</span></td>
                        <td className="px-4 py-3 text-gray-600">ملاحظة اختيارية مع التحويل</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </div>

          <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white">
             <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
               <span className="font-semibold text-sm text-[#0936AD]">عرض مثال للطلب والرد (JSON)</span>
               <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
             </summary>
             <div className="p-4 border-t border-gray-200 space-y-4">
               <div>
                 <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">مثال الطلب</h3>
                 <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto relative" dir="ltr">
                     <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard(`curl -X POST ${baseUrl}/api/v1/wallets/shamcash/e5289b724c3a3a47581b575bfdf6cd53/transfer -H "Authorization: Bearer sk_xxx" -H "Content-Type: application/json" -d '{"recipientAddress": "cf3a8cd33b27ba7a31793b069d919a44", "currencyId": 2, "amount": 500}'`)}><Copy className="w-4 h-4"/></div>
                     <pre><code>{`curl -X POST ${baseUrl}/api/v1/wallets/shamcash/e5289b724c3a3a47581b575bfdf6cd53/transfer \\
-H "Authorization: Bearer sk_xxx" \\
-H "Content-Type: application/json" \\
-d '{
  "recipientAddress": "cf3a8cd33b27ba7a31793b069d919a44",
  "currencyId": 2,
  "amount": 500
}'`}</code></pre>
                 </div>
               </div>
               <div>
                 <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">الرد الناجح</h3>
                 <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto" dir="ltr">
                 <pre><code>{`{
  "success": true,
  "message": "تم التحويل بنجاح"
}`}</code></pre>
                 </div>
               </div>
             </div>
          </details>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
         لأي استفسارات بخصوص الربط، يرجى التواصل مع الدعم الفني.
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* ── قسم الفواتير ── */}
      {/* ══════════════════════════════════════════ */}
      <div className="pt-8 border-t-2 border-[#0936AD]/20 mt-8">
        <h2 className="text-2xl font-bold text-[#0936AD] mb-2">الفواتير (Invoices)</h2>
        <p className="text-sm text-gray-500 mb-6">إنشاء طلبات دفع مؤقتة مع إشعارات Webhook تلقائية — خاص بشام كاش</p>
      </div>

      {/* Create Invoice */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded text-xs font-mono">POST</span>
          <h2 className="font-bold text-lg">إنشاء فاتورة</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-gray-100 p-3 rounded font-mono text-sm font-medium border border-gray-200" dir="ltr">/v1/invoices</div>
          <p className="text-sm text-gray-600 leading-relaxed">ينشئ فاتورة دفع جديدة بحالة <span className="font-mono bg-gray-100 px-1 rounded">pending</span> وتنتهي تلقائياً بعد المدة المحددة.</p>

          <div>
            <h3 className="font-semibold text-sm mb-3">جسم الطلب (JSON Request Body)</h3>
            <div className="border border-gray-200 rounded-lg overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">الحقل</th>
                    <th className="px-4 py-3 font-medium">النوع</th>
                    <th className="px-4 py-3 font-medium">الحالة</th>
                    <th className="px-4 py-3 font-medium">الوصف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">walletAddress</td>
                    <td className="px-4 py-3 font-mono text-blue-600">string</td>
                    <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                    <td className="px-4 py-3 text-gray-600">id المحفظة أو عنوانها أو رقم الحساب (محفظة الاستلام)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">amount</td>
                    <td className="px-4 py-3 font-mono text-blue-600">string</td>
                    <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                    <td className="px-4 py-3 text-gray-600">المبلغ المطلوب (مثال: "5000")</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">currency</td>
                    <td className="px-4 py-3 font-mono text-blue-600">string</td>
                    <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-sm" dir="ltr">SYP | USD | EUR</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">webhookUrl</td>
                    <td className="px-4 py-3 font-mono text-blue-600">string</td>
                    <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">اختياري</span></td>
                    <td className="px-4 py-3 text-gray-600">رابط يستقبل إشعار invoice.paid أو invoice.expired</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">expiresInMinutes</td>
                    <td className="px-4 py-3 font-mono text-blue-600">number</td>
                    <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">اختياري</span></td>
                    <td className="px-4 py-3 text-gray-600">مدة الصلاحية بالدقائق (5–1440، افتراضي: 30)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">note</td>
                    <td className="px-4 py-3 font-mono text-blue-600">string</td>
                    <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">اختياري</span></td>
                    <td className="px-4 py-3 text-gray-600">ملاحظة (حتى 500 حرف)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">metadata</td>
                    <td className="px-4 py-3 font-mono text-blue-600">object</td>
                    <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">اختياري</span></td>
                    <td className="px-4 py-3 text-gray-600">بيانات إضافية تخزنها وتستردها معك</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white">
            <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-sm text-[#0936AD]">عرض مثال للطلب والرد (JSON)</span>
              <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 border-t border-gray-200 space-y-4">
              <div>
                <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">مثال الطلب</h3>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto relative" dir="ltr">
                  <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard(`curl -X POST ${baseUrl}/api/v1/invoices -H "Authorization: Bearer sk_xxx" -H "Content-Type: application/json" -d '{"walletAddress":"e5289b724c3a3a47581b575bfdf6cd53","amount":"5000","currency":"SYP","webhookUrl":"https://yourapp.com/webhook","expiresInMinutes":30}'`)}><Copy className="w-4 h-4"/></div>
                  <pre><code>{`curl -X POST ${baseUrl}/api/v1/invoices \\
-H "Authorization: Bearer sk_xxx" \\
-H "Content-Type: application/json" \\
-d '{
  "walletAddress": "e5289b724c3a3a47581b575bfdf6cd53",
  "amount": "5000",
  "currency": "SYP",
  "webhookUrl": "https://yourapp.com/webhook",
  "expiresInMinutes": 30,
  "metadata": { "orderId": "ORD-001" }
}'`}</code></pre>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-xs text-gray-500 mb-2 uppercase tracking-wider">الرد الناجح (201)</h3>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto" dir="ltr">
                  <pre><code>{`{
  "invoiceId": "3f8a1c2d-7b4e-4a9c-8d2f-1e5b6c7d8e9f",
  "status": "pending",
  "method": "shamcash",
  "identifier": "e5289b724c3a3a47581b575bfdf6cd53",
  "amount": "5000",
  "currency": "SYP",
  "expiresAt": "2026-05-01T14:45:00.000Z",
  "createdAt": "2026-05-01T14:15:00.000Z"
}`}</code></pre>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Get Invoice */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs font-mono">GET</span>
          <h2 className="font-bold text-lg">جلب فاتورة</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-100 p-3 rounded font-mono text-sm font-medium border border-gray-200" dir="ltr">/v1/invoices/{"{invoiceId}"}</div>
          <p className="text-sm text-gray-600">يعيد تفاصيل فاتورة واحدة بمعرّفها.</p>
          <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white">
            <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-sm text-[#0936AD]">عرض مثال للطلب والرد (JSON)</span>
              <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 border-t border-gray-200 space-y-4">
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto relative" dir="ltr">
                <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard(`curl ${baseUrl}/api/v1/invoices/3f8a1c2d-7b4e-4a9c-8d2f-1e5b6c7d8e9f -H "Authorization: Bearer sk_xxx"`)}><Copy className="w-4 h-4"/></div>
                <pre><code>curl {baseUrl}/api/v1/invoices/3f8a1c2d-7b4e-4a9c-8d2f-1e5b6c7d8e9f{'\n'}-H "Authorization: Bearer sk_xxx"</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto" dir="ltr">
                <pre><code>{`{
  "invoiceId": "3f8a1c2d-7b4e-4a9c-8d2f-1e5b6c7d8e9f",
  "status": "paid",
  "method": "shamcash",
  "identifier": "e5289b724c3a3a47581b575bfdf6cd53",
  "amount": "5000",
  "currency": "SYP",
  "transactionRef": "TXN_98765",
  "paidAmount": 5000,
  "counterparty": "0989876543",
  "paidAt": "2026-05-01T14:07:22.000Z",
  "expiresAt": "2026-05-01T14:45:00.000Z",
  "createdAt": "2026-05-01T14:15:00.000Z"
}`}</code></pre>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* List Invoices */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs font-mono">GET</span>
          <h2 className="font-bold text-lg">قائمة الفواتير</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-100 p-3 rounded font-mono text-sm font-medium border border-gray-200" dir="ltr">/v1/invoices</div>
          <p className="text-sm text-gray-600">يعيد جميع الفواتير مع دعم الفلترة والصفحات.</p>
          <div className="border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Query Param</th>
                  <th className="px-4 py-3 font-medium">النوع</th>
                  <th className="px-4 py-3 font-medium">الوصف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">status</td>
                  <td className="px-4 py-3 font-mono text-blue-600 text-xs" dir="ltr">pending | paid | expired | cancelled</td>
                  <td className="px-4 py-3 text-gray-600">فلتر حسب الحالة (اختياري)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">page</td>
                  <td className="px-4 py-3 font-mono text-blue-600">number</td>
                  <td className="px-4 py-3 text-gray-600">رقم الصفحة (افتراضي: 1)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">limit</td>
                  <td className="px-4 py-3 font-mono text-blue-600">number</td>
                  <td className="px-4 py-3 text-gray-600">عدد النتائج لكل صفحة (1–100، افتراضي: 20)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cancel Invoice */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded text-xs font-mono">DELETE</span>
          <h2 className="font-bold text-lg">إلغاء فاتورة</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-gray-100 p-3 rounded font-mono text-sm font-medium border border-gray-200" dir="ltr">/v1/invoices/{"{invoiceId}"}</div>
          <p className="text-sm text-gray-600">يلغي فاتورة بحالة <span className="font-mono bg-gray-100 px-1 rounded">pending</span> فقط. الفواتير المدفوعة أو المنتهية لا يمكن إلغاؤها.</p>
          <details className="group border border-gray-200 rounded-lg overflow-hidden bg-white">
            <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="font-semibold text-sm text-[#0936AD]">عرض مثال</span>
              <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-4 border-t border-gray-200 space-y-4">
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto relative" dir="ltr">
                <div className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer" onClick={() => copyToClipboard(`curl -X DELETE ${baseUrl}/api/v1/invoices/3f8a1c2d-7b4e-4a9c-8d2f-1e5b6c7d8e9f -H "Authorization: Bearer sk_xxx"`)}><Copy className="w-4 h-4"/></div>
                <pre><code>curl -X DELETE {baseUrl}/api/v1/invoices/3f8a1c2d-7b4e-4a9c-8d2f-1e5b6c7d8e9f{'\n'}-H "Authorization: Bearer sk_xxx"</code></pre>
              </div>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto" dir="ltr">
                <pre><code>{`{ "success": true, "message": "تم إلغاء الفاتورة بنجاح" }`}</code></pre>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Webhook Events */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
          <span className="bg-purple-100 text-purple-700 font-bold px-2 py-1 rounded text-xs font-mono">WEBHOOK</span>
          <h2 className="font-bold text-lg">إشعارات Webhook</h2>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            عند تغيّر حالة الفاتورة، يُرسَل طلب <span className="font-mono bg-gray-100 px-1 rounded">POST</span> تلقائياً إلى <span className="font-mono bg-gray-100 px-1 rounded">webhookUrl</span> الذي حددته. يجب أن يرد خادمك بـ <span className="font-mono bg-gray-100 px-1 rounded">HTTP 2xx</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="font-bold text-sm text-green-800 font-mono">invoice.paid</span>
              </div>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto" dir="ltr">
                <pre><code>{`{
  "event": "invoice.paid",
  "invoiceId": "3f8a1c2d-...",
  "method": "shamcash",
  "identifier": "e5289b...",
  "amount": "5000",
  "currency": "SYP",
  "transactionRef": "TXN_98765",
  "paidAmount": 5000,
  "counterparty": "0989876543",
  "paidAt": "2026-05-01T14:07:22.000Z"
}`}</code></pre>
              </div>
            </div>

            <div className="border border-red-200 bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="font-bold text-sm text-red-800 font-mono">invoice.expired</span>
              </div>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto" dir="ltr">
                <pre><code>{`{
  "event": "invoice.expired",
  "invoiceId": "3f8a1c2d-...",
  "method": "shamcash",
  "identifier": "e5289b...",
  "amount": "5000",
  "currency": "SYP",
  "expiredAt": "2026-05-01T14:45:00.000Z"
}`}</code></pre>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">الحقل</th>
                  <th className="px-4 py-3 font-medium">النوع</th>
                  <th className="px-4 py-3 font-medium">الحالة</th>
                  <th className="px-4 py-3 font-medium">الوصف</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">event</td>
                  <td className="px-4 py-3 font-mono text-blue-600">string</td>
                  <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs" dir="ltr">invoice.paid | invoice.expired</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">invoiceId</td>
                  <td className="px-4 py-3 font-mono text-blue-600">string</td>
                  <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                  <td className="px-4 py-3 text-gray-600">معرّف الفاتورة</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">method</td>
                  <td className="px-4 py-3 font-mono text-blue-600">string</td>
                  <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                  <td className="px-4 py-3 text-gray-600">طريقة الدفع (shamcash)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">identifier</td>
                  <td className="px-4 py-3 font-mono text-blue-600">string</td>
                  <td className="px-4 py-3"><span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">مطلوب</span></td>
                  <td className="px-4 py-3 text-gray-600">معرّف محفظة الاستلام</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">transactionRef</td>
                  <td className="px-4 py-3 font-mono text-blue-600">string</td>
                  <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">paid فقط</span></td>
                  <td className="px-4 py-3 text-gray-600">رقم العملية في شام كاش</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">paidAmount</td>
                  <td className="px-4 py-3 font-mono text-blue-600">number</td>
                  <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">paid فقط</span></td>
                  <td className="px-4 py-3 text-gray-600">المبلغ الفعلي المستلم</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">counterparty</td>
                  <td className="px-4 py-3 font-mono text-blue-600">string</td>
                  <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">paid فقط</span></td>
                  <td className="px-4 py-3 text-gray-600">المُرسِل (عنوان المحفظة أو رقم الهاتف)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">paidAt</td>
                  <td className="px-4 py-3 font-mono text-blue-600">string</td>
                  <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">paid فقط</span></td>
                  <td className="px-4 py-3 text-gray-600">وقت الدفع ISO 8601</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[#0936AD]" dir="ltr">expiredAt</td>
                  <td className="px-4 py-3 font-mono text-blue-600">string</td>
                  <td className="px-4 py-3"><span className="text-gray-600 text-xs font-bold bg-gray-100 px-2 py-1 rounded">expired فقط</span></td>
                  <td className="px-4 py-3 text-gray-600">وقت الانتهاء ISO 8601</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* ── رموز الأخطاء ── */}
      {/* ══════════════════════════════════════════ */}
      <div className="pt-8 border-t-2 border-[#0936AD]/20 mt-8">
        <h2 className="text-2xl font-bold text-[#0936AD] mb-2">رموز الأخطاء</h2>
        <p className="text-sm text-gray-500 mb-6">جميع الأخطاء تُعاد بصيغة JSON موحّدة: <span className="font-mono bg-gray-100 px-1 rounded" dir="ltr">{"{ \"error\": \"ERROR_CODE\", \"message\": \"...\" }"}</span></p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border border-gray-200 rounded-xl overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 font-medium w-16">الرمز</th>
                <th className="px-4 py-3 font-medium">الخطأ</th>
                <th className="px-4 py-3 font-medium">الوصف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="inline-block bg-red-100 text-red-700 font-bold text-xs px-2 py-1 rounded font-mono">401</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded w-fit" dir="ltr">MISSING_API_KEY</span>
                    <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded w-fit" dir="ltr">INVALID_API_KEY</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">المفتاح مفقود أو غير صالح</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="inline-block bg-orange-100 text-orange-700 font-bold text-xs px-2 py-1 rounded font-mono">400</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded" dir="ltr">VALIDATION_ERROR</span>
                </td>
                <td className="px-4 py-3 text-gray-600">بيانات الطلب غير صحيحة</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="inline-block bg-orange-100 text-orange-700 font-bold text-xs px-2 py-1 rounded font-mono">400</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded" dir="ltr">INVALID_IDENTIFIER</span>
                </td>
                <td className="px-4 py-3 text-gray-600">تنسيق معرّف المحفظة غير مطابق للمزوّد المحدد</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="inline-block bg-orange-100 text-orange-700 font-bold text-xs px-2 py-1 rounded font-mono">404</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded" dir="ltr">NOT_FOUND</span>
                </td>
                <td className="px-4 py-3 text-gray-600">المحفظة أو الفاتورة غير موجودة</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="inline-block bg-orange-100 text-orange-700 font-bold text-xs px-2 py-1 rounded font-mono">410</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded" dir="ltr">EXPIRED</span>
                </td>
                <td className="px-4 py-3 text-gray-600">انتهت صلاحية الفاتورة</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="inline-block bg-red-100 text-red-700 font-bold text-xs px-2 py-1 rounded font-mono">401</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded" dir="ltr">WALLET_SESSION_EXPIRED</span>
                </td>
                <td className="px-4 py-3 text-gray-600">انتهت جلسة المحفظة، أعد ربطها من لوحة التحكم</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="inline-block bg-yellow-100 text-yellow-700 font-bold text-xs px-2 py-1 rounded font-mono">502</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded" dir="ltr">WALLET_UPSTREAM_ERROR</span>
                </td>
                <td className="px-4 py-3 text-gray-600">تعذّر الاتصال بمزوّد المحفظة</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="inline-block bg-yellow-100 text-yellow-700 font-bold text-xs px-2 py-1 rounded font-mono">502</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded" dir="ltr">PROVIDER_ERROR</span>
                </td>
                <td className="px-4 py-3 text-gray-600">رفض المزوّد العملية (رسالة المزوّد مرفقة في الرد)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">مثال رد خطأ</p>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm" dir="ltr">
            <pre><code>{`HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "error": "WALLET_SESSION_EXPIRED",
  "message": "Session expired. Please reconnect wallet in dashboard."
}`}</code></pre>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
         لأي استفسارات بخصوص الربط، يرجى التواصل مع الدعم الفني.
      </div>
    </div>
  );
}
