import React from "react";
import { useState } from 'react';
import './Form1.css'
import { HiOutlineMicrophone } from "react-icons/hi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

function getErrors(input){
        let errors = {};
           //amount Validation
           if (input.amount===''){ 
            errors.amount = "Amount cannot be empty"
        } else{
           errors.amount = ""
        }

           //walletAdress Validation
           if (input.walletAdress===''){ 
             errors.walletAdress = "Wallet Adress cannot be empty"
            
         } else{
              errors.walletAdress = ""
         }

          //email Validation
          if(input.email===''){
            errors.email = "Email cannot be empty"
          }
          else{
            if(!(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/).test(input.email)){
              errors.email = "Email its not a valid email"
            }
            else{
              errors.email = ""
            }
          }
 
         //mobileNumber Validation
         if (input.mobileNumber===''){ 
            errors.mobileNumber = "Mobile number cannot be empty"
         } else{
             if (!(/\d/).test(input.mobileNumber) ) {  
               errors.mobileNumber = "Mobile number must be a number"
             }else{
             errors.mobileNumber = ""
             }
         }
 
         //WalletPool Validation
         if (input.walletPool===''){ 
             errors.walletPool = "WalletPool cannot be empty"
         } else{
              errors.walletPool = ""
         }
 
         //password Validation
         if (input.password===''){ 
           errors.password = "password Adress cannot be empty"
         } else{
             errors.password = ""

         }

         return errors
}



const Form = () => {

    const[input,setInput]=useState({
        email:'',
        mobileNumber:'',
        walletPool:'',
        password:'',
        amount:'',
        walletAdress:''
    })

    let [errors, setErrors] = useState({
        email:'',
        mobileNumber:'',
        walletPool:'',  
        password:'',
        amount:'',
        walletAdress:''
    }) 

    const[showPassword,setShowPassword] = useState(false)

    function apiCall(){
      console.log("envio completo",input);
      setLoader((false));
    }

    const [loader,setLoader] = useState(false)


    //FUNTION VALIDATE
    const validate=async (ev)=>{
      setInput((input)=>({...input,[ev.target.name]:ev.target.value}))
      setErrors((errors)=>({...errors,[ev.target.name]:""}))
    }

    //SHOW NOTSHOW PASSWORD
    const showPass=()=>{
      setShowPassword(!showPassword)
      console.log("showPass",showPassword)
    }
    
    
    //FUNCTION SUBMIT
    const handleSubmit= async(e)=>{
        e.preventDefault();
        errors=getErrors(input)
        setErrors(getErrors(input))
        errors.email||errors.mobileNumber||errors.walletPool||errors.password||errors.walletAdress||errors.amount?
          console.log("hay errores")
          :
          (
            setLoader(true)
            (setTimeout(apiCall, 3000))
          )
    }
    


  return (
<form 
    className="Form1"
    onSubmit={(e) => handleSubmit(e)}
    onChange={(e) => validate(e)}
>
  <div>

    <h1>TITULO.</h1>
  
    <label className="Form1Label">Amount *</label>
    <input type="text" name="amount"   placeholder="Amount of Beneficial Owners" className={errors.amount?"formError form1Input ":"form1Input"}/>
    
    <label className="Form1Label">Wallet Adress *</label>
    <div className="Form1Icon"><AiOutlineQuestionCircle/></div>
    <input type="text" name="walletAdress"  placeholder="Your Wallet Adress" className={errors.walletAdress?"formError form1Input ":"form1Input"}/>
    

    <label className="Form1Label">E-mail *</label>
    <div className="Form1Icon"><AiOutlineQuestionCircle/></div>
    <input type="text" name="email"  placeholder="Your E-Mail"  className={errors.email?"formError form1Input ":"form1Input"} />
    
    <label>Phone Number *</label>
    <div className="Form1Icon"><AiOutlineQuestionCircle/></div>
    <input type="text" name="mobileNumber"  placeholder="Your Phone Number"  className={errors.mobileNumber?"formError form1Input ":"form1Input"}/>
    
    <label className="Form1Label">walletPool *</label>
    <input type="text" name="walletPool"  placeholder="Wallet Address Pool" className={errors.walletPool?"formError form1Input ":"form1Input"}/>

    <label>Password *</label>
    <div className="Form1Icon"  onClick={(ev)=>showPass(ev)}>{!showPassword?<IoEyeOffOutline/>:<IoEyeOutline/>}</div>
    <input type={showPassword?"text":"Password"} name="password" placeholder="Your Password" style={errors.password?{border:"2px solid red"}:{}} className={errors.password?"formError form1Input ":"form1Input"}/>
    


    <button type="submit" name="next" className={loader?"Button1 Button1Disable":"Button1"} value="Button1" >{loader?"Loading...":"Next"}</button>

    
    
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

export default Form;