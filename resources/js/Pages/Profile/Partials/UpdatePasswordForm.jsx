import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import {
    Input,
    Typography,
    Button
} from "@material-tailwind/react";

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <Input 
                        ref={currentPasswordInput}
                        type="password"
                        size="lg" 
                        label="Current Password" 
                        value={data.current_password}
                        autoComplete="name"
                        onChange={(e) => setData('current_password', e.target.value)}
                        error={errors.current_password}
                    />
                    
                    {errors.current_password && 
                        <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                            {errors.current_password}
                        </Typography>
                    }
                </div>

                <div>
                    <Input 
                        ref={passwordInput}
                        type="password"
                        size="lg" 
                        label="New Password" 
                        value={data.password}
                        autoComplete="name"
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                    />
                    
                    {errors.password && 
                        <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                            {errors.password}
                        </Typography>
                    }
                </div>

                <div>
                    <Input 
                        type="password"
                        size="lg" 
                        label="Confirm Password" 
                        value={data.password_confirmation}
                        autoComplete="name"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        error={errors.password_confirmation}
                    />
                    
                    {errors.password_confirmation && 
                        <Typography variant="small" color="red" className="flex items-center gap-1 font-normal mt-2">
                            {errors.password_confirmation}
                        </Typography>
                    }
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={processing} size="sm">Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
