import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogIn, User, Globe, Mail, ArrowRight, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error: loginError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (loginError) throw loginError;
                navigate('/dashboard');
            } else {
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                            website: website,
                        }
                    }
                });
                if (signUpError) throw signUpError;

                // After signup, we also create a profile entry
                if (data.user) {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .insert([
                            {
                                id: data.user.id,
                                full_name: name,
                                website: website,
                                email: email
                            }
                        ]);
                    if (profileError) {
                        console.error('Error creating profile:', profileError);
                        // We continue anyway since auth succeeded
                    }
                }

                setError("Check your email for the confirmation link!");
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-6 py-12">
            {/* Background Decorative elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className={`w-full max-w-md bg-white/5 backdrop-blur-xl border border-[#282828] rounded-[40px] p-8 md:p-10 relative z-10 transition-all duration-500`}>
                <div className="text-center mb-10">
                    <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-[10px] font-black tracking-[0.2em] text-primary mb-6 uppercase border border-primary/20">
                        {isLogin ? 'Welcome Back' : 'Join the Infrastructure'}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">
                        {isLogin ? 'USER LOGIN' : 'CREATE ACCOUNT'}
                    </h1>
                    <p className="text-[#99A1AF] font-medium">
                        {isLogin
                            ? 'Access your enterprise dashboard and insights.'
                            : 'Launch your high-performance voice infrastructure.'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    {!isLogin && (
                        <>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#555] ml-4">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-5 pl-14 rounded-2xl font-bold focus:border-primary outline-none transition-colors"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#555] ml-4">Website URL</label>
                                <div className="relative">
                                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                                    <input
                                        type="url"
                                        required
                                        placeholder="https://example.com"
                                        className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-5 pl-14 rounded-2xl font-bold focus:border-primary outline-none transition-colors"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#555] ml-4">Work Email</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                            <input
                                type="email"
                                required
                                placeholder="email@company.com"
                                className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-5 pl-14 rounded-2xl font-bold focus:border-primary outline-none transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#555] ml-4">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-[#1A1A1A] border border-[#282828] text-white p-5 rounded-2xl font-bold focus:border-primary outline-none transition-colors"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black py-5 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest shadow-primary flex items-center justify-center gap-3 mt-4"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                {isLogin ? 'SIGN IN NOW' : 'CREATE INFRASTRUCTURE'}
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-[#555] hover:text-primary transition-colors"
                    >
                        {isLogin
                            ? "DON'T HAVE AN ACCOUNT? CREATE ONE"
                            : "ALREADY HAVE AN ACCOUNT? SIGN IN"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
