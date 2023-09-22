import React, { useState } from 'react'
import { TbSocial } from 'react-icons/tb'
import {AiOutlineInteraction} from "react-icons/ai"
import {ImConnection} from "react-icons/im"
import {BsShare} from 'react-icons/bs'
import { CustomButton, InputText, Loading } from '../components'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SocialImg } from '../assets'
import { apiRequest } from '../utils'
import { UserLogin } from '../redux/userSlice'


const Login = () => {

  // Using the useForm hook to manage form-related functionality.
  // Configuring the form mode to "onChange," which means validation occurs as the user makes changes.
  const {
    register,          // Function to register form inputs.
    handleSubmit,      // Function to handle form submissions.
    formState: { errors }, // An object containing information about form field validation errors.
  } = useForm({ mode: "onChange" });

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async(data)=>{
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/auth/login",
        data,
        method:"POST",
      });
      if(res?.status === "failed"){
        setErrMsg(res);
      }else{
        setErrMsg("");

        const newData = {token: res?.token, ...res?.user};
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
      
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:j-5/6 py-8 lg:py-0 flex rounded-xl overflow-hidden shadow-xl bg-primary'>
        {/* left */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-blue rounded text-white'>
              <TbSocial />
            </div>
            <span className='text-2xl text-blue font-semibold'>Connectify</span>
          </div>
          <p className='text-ascent-1 text-base font-semibold'>Enter the Community</p>
          <span className='text-sm mt-2 text-ascent-2'>Great to See You</span>
          <form className='py-8 flex flex-col gap-5 ' onSubmit={handleSubmit(onSubmit)}>
            <InputText
              name="email"
              label="Email ID"
              placeholder="email@example.com"
              type="email"
              register={                  // Using the 'register' prop to connect this input to form validation.
                register("email", {       // Calling 'register' function with field name and validation rules.
                  required: "Email ID is required" // Specifying that the field is required and providing an error message.
                })
              }
              styles="w-full rounded-full"
              labelStyle='ml-2'
              error={errors.email ? errors.email.message : ""}
            />
            <InputText
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              register={                  // Using the 'register' prop to connect this input to form validation.
                register("password", {       // Calling 'register' function with field name and validation rules.
                  required: "Password is required" // Specifying that the field is required and providing an error message.
                })
              }
              styles="w-full rounded-full"
              labelStyle='ml-2'
              error={errors.password ? errors.password.message : ""}
            />

            <Link to="/reset-password"
              className='text-sm text-right text-blue font-semibold'
            >Trouble Logging In?</Link>

            {
              // Check if 'errMsg' has a 'message' property and if it exists, render the following:
              errMsg?.message && (
                // Render a <span> element with conditional classes based on 'err.Msg?.status'
                <span className={`text-sm ${errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"} mt-0.5`}>
                  {/* Display the 'errMsg' message */}
                  {errMsg?.message}
                </span>
              )
            }
            {
              isSubmitting? <Loading /> : <CustomButton type='submit' containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`} title = "Get Started"/>      
                    }


          </form>

          <p className='text-ascent-2 text-sm text-center'> Ready to join?
          <Link
          to="/register"
          className='text-blue font-semibold ml-2 cursor-pointer'
          >
            Join the Community
            </Link></p>
        </div>
        {/* right */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img src={SocialImg} alt="LoginPage Image" className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover' />

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14}/>
              <span className='text-xs font-medium'>Share</span>
            </div>
            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection size={14}/>
              <span className='text-xs font-medium'>Connect</span>
            </div>
            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction size={14}/>
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
            Connect, Share and Enjoy
            </p>
            <span className='text-sm text-white/80'>
            Friendship Knows No Borders: Share Your Story
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
