import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Head, Link, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#F8F9FA] px-4 sm:px-6 lg:px-8">
            <Head title="Log in" />

            {/* Logo */}
            <div className="mb-8">
                <ApplicationLogo className="w-24 h-24 text-[#1B4332]" />
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl">
                <CardContent className="p-8">
                    {status && (
                        <div className="mb-4 font-medium text-sm text-[#40916C]">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="mt-1"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="mt-1"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) =>
                                    setData("remember", checked)
                                }
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm text-[#2D3436]"
                            >
                                Remember me
                            </Label>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-[#40916C] hover:text-[#1B4332] underline"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <div className="flex space-x-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#FFB703] hover:bg-[#e6a200] text-[#2D3436] flex-1"
                                >
                                    Log in
                                </Button>
                                <Link href={route("register")}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
