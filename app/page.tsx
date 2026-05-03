// app/page.tsx
'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

export default function LoginPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0f0f',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '20px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Icône */}
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', marginBottom: '20px',
        }}>
          🔐
        </div>

        <h1 style={{
          color: '#f5f5f5', fontSize: '22px', fontWeight: '600',
          margin: '0 0 8px', textAlign: 'center',
        }}>
          Bienvenue
        </h1>
        <p style={{
          color: '#666', fontSize: '14px',
          margin: '0 0 36px', textAlign: 'center',
        }}>
          Connecte-toi pour accéder à ton espace
        </p>

        {/* Bouton Google */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          style={{
            width: '100%', padding: '13px 20px',
            background: '#fff', border: 'none', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '10px', cursor: 'pointer', fontSize: '14px',
            fontWeight: '500', color: '#1a1a1a', marginBottom: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          <FcGoogle size={20} />
          Continuer avec Google
        </button>

        {/* Bouton GitHub */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          style={{
            width: '100%', padding: '13px 20px',
            background: '#24292e', border: '1px solid #3a3a3a',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '10px', cursor: 'pointer', fontSize: '14px',
            fontWeight: '500', color: '#f5f5f5',
          }}
        >
          <FaGithub size={20} />
          Continuer avec GitHub
        </button>

        <p style={{
          color: '#444', fontSize: '12px',
          marginTop: '28px', textAlign: 'center',
        }}>
          En te connectant, tu acceptes nos conditions d'utilisation
        </p>
      </div>
    </main>
  )
}