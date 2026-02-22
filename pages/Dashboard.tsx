import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
    BarChart3,
    Target,
    Users,
    DollarSign,
    TrendingUp,
    LogOut,
    Save,
    Loader2,
    Globe,
    Plus
} from 'lucide-react';

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);

    // Dashboard Metrics
    const [goal, setGoal] = useState('');
    const [income, setIncome] = useState('');
    const [clients, setClients] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/login');
            return;
        }
        setUser(user);
        loadProfile(user.id);
    };

    const loadProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') throw error;

            if (data) {
                setProfile(data);
                setGoal(data.revenue_goal || '');
                setIncome(data.current_income || '');
                setClients(data.client_count || '');
            }
        } catch (err) {
            console.error('Error loading profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);

        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    revenue_goal: goal,
                    current_income: income,
                    client_count: clients,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;
            alert('Dashboard updated successfully');
        } catch (err: any) {
            alert('Error saving data: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#09090b] text-white">
            {/* Sidebar / Navigation */}
            <nav className="border-b border-white/5 bg-[#0f0f11]/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black font-black italic">
                            N
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">NOXXERA <span className="text-primary italic">CORE</span></h1>
                            <p className="text-[9px] font-black tracking-[0.3em] text-[#555] uppercase mt-1 px-0.5">Infrastructure Hub</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end mr-4">
                            <span className="text-xs font-black uppercase tracking-tight">{profile?.full_name || user?.email}</span>
                            <span className="text-[10px] text-primary italic font-bold uppercase">{profile?.website || 'Premium Ops'}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-3 bg-white/5 border border-[#282828] rounded-xl text-[#555] hover:text-red-500 hover:border-red-500/30 transition-all active:scale-95"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                {/* Welcome Header */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
                        Infrastructure <span className="text-primary italic">Overview</span>
                    </h2>
                    <p className="text-[#99A1AF] font-medium max-w-xl text-lg">
                        Track your operational metrics and revenue scalability in real-time.
                    </p>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Revenue Goal Card */}
                    <div className="bg-white/5 backdrop-blur-sm border border-[#282828] p-8 rounded-[35px] group hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <Target className="w-6 h-6" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-[#333] group-hover:text-primary transition-colors" />
                        </div>
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#555] mb-4 block">Monthly Revenue Goal</label>
                        <div className="relative">
                            <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-[#222] font-black" />
                            <input
                                type="number"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-transparent border-none text-4xl font-black text-white p-0 pl-10 outline-none placeholder:text-[#1A1A1A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>

                    {/* Current Income Card */}
                    <div className="bg-white/5 backdrop-blur-sm border border-[#282828] p-8 rounded-[35px] group hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <BarChart3 className="w-4 h-4 text-[#333]" />
                        </div>
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#555] mb-4 block">Current Monthly Income</label>
                        <div className="relative">
                            <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-[#222] font-black" />
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-transparent border-none text-4xl font-black text-white p-0 pl-10 outline-none placeholder:text-[#1A1A1A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>

                    {/* Client Count Card */}
                    <div className="bg-white/5 backdrop-blur-sm border border-[#282828] p-8 rounded-[35px] group hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <Plus className="w-4 h-4 text-[#333]" />
                        </div>
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#555] mb-4 block">Total Active Clients</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={clients}
                                onChange={(e) => setClients(e.target.value)}
                                placeholder="0"
                                className="w-full bg-transparent border-none text-4xl font-black text-white p-0 outline-none placeholder:text-[#1A1A1A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full bg-white text-black h-20 rounded-3xl flex items-center justify-center gap-4 font-black text-lg tracking-tight shadow-2xl hover:scale-[1.05] active:scale-95 transition-all group"
                    >
                        {saving ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                <Save className="w-6 h-6 transition-transform group-hover:scale-110" />
                                SYNC INFRASTRUCTURE DATA
                            </>
                        )}
                    </button>
                </div>

                {/* Website Link Section */}
                <div className="mt-12 bg-white/5 border border-[#282828] p-10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-[#1A1A1A] border border-[#282828] rounded-2xl flex items-center justify-center text-[#444]">
                            <Globe className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Active Property</p>
                            <h3 className="text-2xl font-black tracking-tighter uppercase">{profile?.website || 'No website linked'}</h3>
                        </div>
                    </div>
                    <button className="text-xs font-black uppercase tracking-[0.2em] px-8 py-4 bg-[#1A1A1A] border border-[#282828] rounded-2xl hover:border-primary transition-all">
                        Update Properties
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
