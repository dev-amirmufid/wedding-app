import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Input, Typography, Button, Checkbox } from "@material-tailwind/react";

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
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <Input
                        type="email"
                        size="lg"
                        label="Email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />

                    {errors.email && (
                        <Typography
                            variant="small"
                            color="red"
                            className="flex items-center gap-1 font-normal mt-2"
                        >
                            {errors.email}
                        </Typography>
                    )}
                </div>

                <div className="mt-4">
                    <Input
                        type="password"
                        size="lg"
                        label="Password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                    />

                    {errors.password && (
                        <Typography
                            variant="small"
                            color="red"
                            className="flex items-center gap-1 font-normal mt-2"
                        >
                            {errors.password}
                        </Typography>
                    )}
                </div>

                <div className="block mt-4">
                    <Checkbox
                        label="Remember Me"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button
                        type="submit"
                        className="ml-4"
                        disabled={processing}
                        size="sm"
                    >
                        Log in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
