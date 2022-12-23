import React from "react";
import { useState } from 'react';
import './Form1.css'
import { HiOutlineMicrophone } from "react-icons/hi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";


const Form1 = () => {

    const[input,setInput]=useState({
        email:'',
        mobileNumber:'',
        walletPool:'',
        amount:'',
        walletAdress:''
    })

    const [errors, setErrors] = useState({
        email:'',
        mobileNumber:'',
        walletPool:'',  
        amount:'',
        walletAdress:''
    }) 

    function apiCall(){
      console.log("envio completo",input);
      setLoader((false));
    }

    //FUNTION GETERRORS
    function getErrors() {
        //amount Validation
        if (input.amount===''){ 
          errors.amount = "Amount cannot be empty"
          setErrors(()=>({...errors,amount:"Amount cannot be empty"}))
        } else{
        errors.amount = ""
          setErrors(()=>({...errors,amount:""}))
        }

        //walletAdress Validation
        if (input.walletAdress===''){ 
          errors.walletAdress = "Wallet Adress cannot be empty"
          setErrors((errors)=>({...errors,walletAdress:"Wallet Adress cannot be empty"}))
        } else{
            errors.walletAdress = ""
          setErrors((errors)=>({...errors,walletAdress:""}))
        }

        //email Validation
        if (input.email===''){ 
          errors.email = "Email cannot be empty"
          setErrors((errors)=>({...errors,email:"Email cannot be empty"}))
        } else{
          if (!(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/).test(input.email) ) {  
              errors.email = "Email its not a valid email"
              setErrors((errors)=>({...errors,email:"Email its not a valid email"}))
          }else{
              errors.email = ""
              setErrors((errors)=>({...errors,email:""}))
          }
        }

        //mobileNumber Validation
        if (input.mobileNumber===''){ 
        errors.mobileNumber = "Mobile number cannot be empty"
        setErrors((errors)=>({...errors,mobileNumber:"Mobile number cannot be empty"}))
        } else{
          if (!(/\d/).test(input.mobileNumber) ) {  
            errors.mobileNumber = "Mobile number must be a number"
            setErrors((errors)=>({...errors,mobileNumber:"Mobile number must be a number"}))
          }else{
          errors.mobileNumber = ""
          setErrors((errors)=>({...errors,mobileNumber:""}))
          }
        }

        //WalletPool Validation
        if (input.walletPool===''){ 
          errors.walletPool = "WalletPool cannot be empty"
          setErrors((errors)=>({...errors,walletPool:"WalletPool cannot be empty"}))
        } else{
            errors.walletPool = ""
          setErrors((errors)=>({...errors,walletPool:""}))
        }
    }

    const [loader,setLoader] = useState(false)


    //FUNTION VALIDATE
    const validate=async (ev)=>{
      setInput((input)=>({...input,[ev.target.name]:ev.target.value}))
      setErrors((errors)=>({...errors,[ev.target.name]:""}))
    }


    
    //FUNCTION SUBMIT
    const handleSubmit= async(e)=>{
        e.preventDefault();
        getErrors()
        console.log("errors mostrar:",errors)
        errors.email||errors.mobileNumber||errors.walletPool||errors.walletAdress||errors.amount?
          console.log("hay errores")
          :
          (
            setLoader(true)
            (setTimeout(apiCall, 3000))
          )
    }
    


  return (
<form id="Form1">
  <div>

    <h1>Start KYC</h1>
    <h1>To start the KYC, we need the following information.</h1>
  
    <label className="Form1Label">Amount *</label>
    <input type="text" name="amount" value={input.amount}  placeholder="Amount of Beneficial Owners" onChange={(ev)=>validate(ev)} style={errors.amount?{border:"2px solid red"}:{}} className={errors.amount&&"form2"}/>
    
    <label className="Form1Label">Wallet Adress *</label>
    <div className="Form1Icon"><AiOutlineQuestionCircle/></div>
    <input type="text" name="walletAdress" value={input.walletAdress} placeholder="Your Wallet Adress" onChange={(ev)=>validate(ev)} style={errors.walletAdress?{border:"2px solid red"}:{}} className={errors.walletAdress&&"form2"}/>
    

    <label className="Form1Label">E-mail *</label>
    <div className="Form1Icon"><AiOutlineQuestionCircle/></div>
    <input type="text" name="email" value={input.email} placeholder="Your E-Mail" onChange={(ev)=>validate(ev)} style={errors.email?{border:"2px solid red"}:{}} className={errors.email&&"form2"} />
    
    <label>Phone Number *</label>
    <div className="Form1Icon"><AiOutlineQuestionCircle/></div>
    <input type="text" name="mobileNumber" value={input.mobileNumber} placeholder="Your Phone Number" onChange={(ev)=>validate(ev)} style={errors.mobileNumber?{border:"2px solid red"}:{}} className={errors.mobileNumber&&"form2"}/>
    
    <label className="Form1Label">walletPool *</label>
    <input type="text" name="walletPool" value={input.walletPool}  placeholder="Wallet Address Pool" onChange={(ev)=>validate(ev)} style={errors.walletPool?{border:"2px solid red"}:{}} className={errors.walletPool&&"form2"}/>

    <button type="submit" onClick={(e)=>handleSubmit(e)} name="next" className={loader?"Button1 Button1Disable":"Button1"} value="Button1" onChange={(ev)=>validate(ev)}>{loader?"Loading...":"Next"}</button>

    
    
    <section className="errorsClass">
        {errors.mobileNumber?<div>{errors.mobileNumber} </div>:<></>}
        {errors.walletAdress?<div>{errors.walletAdress} </div>:<></>}
        {errors.amount?<div>{errors.amount} </div>:<></>}
        {errors.email?<div>{errors.email} </div>:<></>}
        {errors.walletPool?<div>{errors.walletPool} </div>:<></>}
        {errors.password?<div>{errors.password} </div>:<></>}
    </section>
  </div>
</form>
  );
};

export default Form1;