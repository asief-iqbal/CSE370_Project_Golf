import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { USER_API_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.bio,
        skills: user?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("fullname", input.fullname);
        formdata.append("email", input.email);
        formdata.append("phoneNumber", input.phoneNumber);
        formdata.append("bio", input.bio);
        formdata.append("skills", input.skills);
        if (input.file) {
            formdata.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_POINT}/profile/update`, formdata, {
                headers: {
                    "Content-type": 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        setOpen(false);
        console.log(input);
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:mx-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className="text-white font-bold">Update Profile</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submitHandler} className='bg-white'>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 py-4'>
                                <Label htmlFor="name" className="text-right text-black font-bold">Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span=3"
                                />
                            </div>
                            <div className='grid grid-cols-4 py-4'>
                                <Label htmlFor="name" className="text-right text-black font-bold">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span=3"
                                />
                            </div>
                            <div className='grid grid-cols-4 py-4'>
                                <Label htmlFor="name" className="text-right text-black font-bold">Number</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span=3"
                                />
                            </div>
                            <div className='grid grid-cols-4 py-4'>
                                <Label htmlFor="name" className="text-right text-black font-bold">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span=3"
                                />
                            </div>
                            <div className='grid grid-cols-4 py-4'>
                                <Label htmlFor="name" className="text-right text-black font-bold">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span=3"
                                />
                            </div>
                            <div className='grid grid-cols-4 py-4'>
                                <Label htmlFor="name" className="text-right text-black font-bold">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="col-span=3"
                                />
                            </div>

                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 animate-spin' />Please wait</Button> : <Button type="submit" className="flex items center my-4 text-white bg-black rounded-5xl">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog