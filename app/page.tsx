'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { SiMonkeytie } from 'react-icons/si'

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleSignIn = async (provider: string) => {
    setLoadingProvider(provider)
    await signIn(provider, { callbackUrl: '/dashboard' })
    // pas besoin de reset — la page va changer
  }

  const Spinner = ({ color = '#1a1a1a' }: { color?: string }) => (
    <div style={{
      width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${color}25`,
      borderTop: `2px solid ${color}`,
      animation: 'spin 0.7s linear infinite',
    }} />
  )

  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#0f0f0f',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{
        background: '#1a1a1a', border: '1px solid #2a2a2a',
        borderRadius: '20px', padding: '48px 40px',
        width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', marginBottom: '20px',
        }}><SiMonkeytie /></div>

        <h1 style={{ color: '#f5f5f5', fontSize: '22px', fontWeight: '600', margin: '0 0 8px' }}>
          Bienvenue
        </h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 36px', textAlign: 'center' }}>
          Connecte-toi pour accéder à ton espace
        </p>

        {/* Bouton Google */}
        <button
          onClick={() => handleSignIn('google')}
          disabled={!!loadingProvider}
          style={{
            width: '100%', padding: '13px 20px',
            background: '#fff', border: 'none', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '10px', cursor: loadingProvider ? 'not-allowed' : 'pointer',
            fontSize: '14px', fontWeight: '500', color: '#1a1a1a',
            marginBottom: '12px', opacity: loadingProvider && loadingProvider !== 'google' ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loadingProvider === 'google'
            ? <Spinner color="#1a1a1a" />
            : <FcGoogle size={20} />
          }
          {loadingProvider === 'google' ? 'Connexion en cours...' : 'Continuer avec Google'}
        </button>

        {/* Bouton GitHub */}
        <button
          onClick={() => handleSignIn('github')}
          disabled={!!loadingProvider}
          style={{
            width: '100%', padding: '13px 20px',
            background: '#24292e', border: '1px solid #3a3a3a', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '10px', cursor: loadingProvider ? 'not-allowed' : 'pointer',
            fontSize: '14px', fontWeight: '500', color: '#f5f5f5',
            opacity: loadingProvider && loadingProvider !== 'github' ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {loadingProvider === 'github'
            ? <Spinner color="#f5f5f5" />
            : <FaGithub size={20} />
          }
          {loadingProvider === 'github' ? 'Connexion en cours...' : 'Continuer avec GitHub'}
        </button>
      </div>
    </main>
  )
}