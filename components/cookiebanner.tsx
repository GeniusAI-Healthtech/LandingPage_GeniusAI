'use client';

import Link from 'next/link'
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper'
import { useState, useEffect } from 'react'

export default function CookieBanner(){

  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect (() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null)

    setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])

  
  useEffect(() => {
    const newValue = cookieConsent ? 'granted' : 'denied'

    window.gtag("consent", 'update', {
        'analytics_storage': newValue
    });

    setLocalStorage("cookie_consent", cookieConsent)

  }, [cookieConsent]);

  return (
    <div className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                    fixed bottom-0 left-0 right-0 
                    ${cookieConsent != null ? "hidden" : "flex"}
                    flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                    bg-slate-800 rounded-lg shadow`}>

      <div className='text-center'>
        <Link href="/info/cookies"><p className='font-bold text-gray-100'>Utilizamos cookies em nosso site.</p></Link>
      </div>

      
      <div className='flex gap-2'>
        <button className='px-5 py-2 text-gray-300 rounded-md border-gray-900' onClick={() => setCookieConsent(false)}>Recusar</button>
        <button className='bg-gray-900 px-5 py-2 text-white rounded-lg' onClick={() => setCookieConsent(true)}>Permitir Cookies</button>
      </div>   
    </div>
)}