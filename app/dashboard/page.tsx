'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaGithub, FaSignOutAlt, FaEnvelope, FaUser } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  const handleSignOut = async () => {
    setLoggingOut(true)
    await signOut({ callbackUrl: '/' })
  }

  const Spinner = ({ color = '#e05a5a', size = 14 }: { color?: string; size?: number }) => (
    <div style={{
      width: `${size}px`, height: `${size}px`, borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${color}25`,
      borderTop: `2px solid ${color}`,
      animation: 'spin 0.7s linear infinite',
    }} />
  )

  if (status === 'loading') {
    return (
      <main style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#0f0f0f',
      }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner color="#6366f1" size={32} />
          </div>
          <p style={{ color: '#555', fontSize: '14px', marginTop: '16px', fontFamily: 'system-ui' }}>
            Chargement...
          </p>
        </div>
      </main>
    )
  }

  if (!session) return null

  const user     = session.user
  const provider = (user as any).provider as string

  return (
    <main style={{
      minHeight: '100vh', background: '#0f0f0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', fontFamily: 'system-ui, sans-serif',
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Header carte */}
        <div style={{
          background: '#1a1a1a', border: '1px solid #2a2a2a',
          borderRadius: '20px', padding: '32px',
          marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '20px',
        }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {user?.image ? (
              <img src={user.image} alt="avatar" style={{
                width: '72px', height: '72px', borderRadius: '50%',
                border: '3px solid #2a2a2a',
              }} />
            ) : (
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', color: '#fff', fontWeight: '600',
              }}>
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            {/* Badge provider */}
            <div style={{
              position: 'absolute', bottom: '-2px', right: '-2px',
              width: '22px', height: '22px', borderRadius: '50%',
              background: provider === 'github' ? '#24292e' : '#fff',
              border: '2px solid #1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {provider === 'google'
                ? <FcGoogle size={13} />
                : <FaGithub size={13} color="#f5f5f5" />
              }
            </div>
          </div>

          {/* Nom */}
          <div>
            <p style={{
              color: '#f5f5f5', fontSize: '20px',
              fontWeight: '600', margin: '0 0 4px',
            }}>
              {user?.name}
            </p>
            <p style={{ color: '#555', fontSize: '13px', margin: 0 }}>
              Connecté via {provider === 'google' ? 'Google' : 'GitHub'}
            </p>
          </div>
        </div>

        {/* Infos */}
        <div style={{
          background: '#1a1a1a', border: '1px solid #2a2a2a',
          borderRadius: '20px', overflow: 'hidden', marginBottom: '16px',
        }}>
          {[
            { icon: <FaEnvelope size={14} color="#6366f1" />, label: 'Email', value: user?.email },
            { icon: <FaUser    size={14} color="#6366f1" />, label: 'Nom',   value: user?.name  },
          ].map((item, i) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center',
              padding: '16px 24px', gap: '14px',
              borderBottom: i === 0 ? '1px solid #222' : 'none',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(99,102,241,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{
                  color: '#555', fontSize: '11px', margin: '0 0 2px',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  {item.label}
                </p>
                <p style={{ color: '#e5e5e5', fontSize: '14px', margin: 0, fontWeight: '500' }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton déconnexion */}
        <button
          onClick={handleSignOut}
          disabled={loggingOut}
          style={{
            width: '100%', padding: '14px',
            background: 'transparent', border: '1px solid #3a1a1a',
            borderRadius: '12px', cursor: loggingOut ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', color: '#e05a5a', fontSize: '14px', fontWeight: '500',
            opacity: loggingOut ? 0.7 : 1, transition: 'opacity 0.2s',
          }}
        >
          {loggingOut
            ? <Spinner color="#e05a5a" size={14} />
            : <FaSignOutAlt size={14} />
          }
          {loggingOut ? 'Déconnexion...' : 'Se déconnecter'}
        </button>

      </div>
    </main>
  )
}