'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname()

    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={150}
                            height={56}
                        />
                    </Link>
                    <Button variant="secondary" asChild>
                        <Link
                            href={
                                pathname === '/sign-in'
                                    ? '/sign-up'
                                    : '/sign-in'
                            }
                        >
                            {pathname === '/sign-in' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </Button>
                </nav>
                <div className="flex flex-col items-center justify-center p-4 md:pt-14">
                    {children}
                </div>
            </div>
        </main>
    )
}
