# HimoSoft — Next.js সাইট

SAP-স্টাইল এন্টারপ্রাইজ ল্যান্ডিং পেজের অনুপ্রেরণায় তৈরি — গাঢ় হিরো, ট্রাস্ট স্ট্রিপ, স্পটলাইট কার্ড, সক্ষমতা গ্রিড, সম্পর্কে, টিম এবং CTA ব্যান্ড।

## ডেভ চালান

```bash
npm install
npm run dev
```

ব্রাউজারে `http://localhost:3000`।

## কনটেন্ট (টেক্সট DB)

কপি **`content/locales/en.json`** (ডিফল্ট) এবং **`content/locales/bn.json`** এ। কাঠামো বদলালে `src/types/site.ts` আপডেট করুন।

- **ভাষা**: ন্যাভবারের বাটন → কুকি `himosoft.locale` (`en` \| `bn`)।
- **মেগা মেনু**: `nav.items`।  
- **সেকশন**: `stories`, `platformTriad`, `domains`, `partners`, `insights` ইত্যাদি।

বিস্তারিত: [`content/README.md`](./content/README.md)

## বিল্ড

```bash
npm run build
npm start
```

## টেক স্ট্যাক

- Next.js (App Router) + React
- Tailwind CSS v4
- ফন্ট: Noto Sans Bengali + Inter
