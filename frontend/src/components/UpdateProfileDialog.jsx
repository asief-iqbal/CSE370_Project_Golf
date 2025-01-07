import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.bio || '',
        skills: user?.skills?.join(', ') || '',
        file: null,
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.fullname || !input.email || !input.phoneNumber) {
            toast.error('Please fill all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.file) formData.append('file', input.file);

        setLoading(true);
        try {
            const res = await axios.post(`${USER_API_POINT}/profile/update`, formData, {
                headers: { 'Content-type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent className="sm:mx-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-white font-bold">Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} className="bg-white">
                    <div className="grid gap-4 py-4">
                        {['fullname', 'email', 'phoneNumber', 'bio', 'skills'].map((field) => (
                            <div className="grid grid-cols-4 items-center" key={field}>
                                <Label htmlFor={field} className="text-right text-black font-bold">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </Label>
                                <Input
                                    id={field}
                                    name={field}
                                    type={field === 'email' ? 'email' : 'text'}
                                    value={input[field]}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                        ))}
                        <div className="grid grid-cols-4 items-center">
                            <Label htmlFor="file" className="text-right text-black font-bold">
                                Resume
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full my-4 text-white bg-black rounded-lg" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 animate-spin" /> : 'Update'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
