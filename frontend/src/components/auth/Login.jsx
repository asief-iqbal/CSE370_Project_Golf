import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Form submitted!"); // Debugging step

        try {
            const res = await axios.post(`${USER_API_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            console.log(res.data); // Debug response

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate('/'); // Navigate to home page on success
            } else {
                toast.error(res.data.message || 'Login failed');
            }
        } catch (error) {
            console.error(error); // Debug errors
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Login</h1>

                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="email@gmail.com"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="password"
                        />
                    </div>
                    <div  className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full my-4 bg-black text-white hover:bg-gray-800">
                        Login
                    </Button>
                    <span>
                        Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
