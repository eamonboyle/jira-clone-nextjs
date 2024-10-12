import * as z from 'zod'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password is required' }),
})

export const SignInCard = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Welcome back!</CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>

            <CardContent className="p-7">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter email addresss"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={false} size="lg" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <div className="px-7">
                <DottedSeparator />
            </div>

            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    disabled={false}
                    variant="secondary"
                    className="w-full"
                    size="lg"
                >
                    <FcGoogle className="size-5 mr-2" />
                    Login with Google
                </Button>
                <Button
                    disabled={false}
                    variant="secondary"
                    className="w-full"
                    size="lg"
                >
                    <FaGithub className="size-5 mr-2" />
                    Login with GitHub
                </Button>
            </CardContent>

            <div className="px-7">
                <DottedSeparator />
            </div>

            <CardContent className="p-7 flex items-center justify-center gap-1">
                <p>Don&apos;t have an account?</p>
                <Link href="/sign-up" className="text-blue-700">
                    Sign up
                </Link>
            </CardContent>
        </Card>
    )
}
