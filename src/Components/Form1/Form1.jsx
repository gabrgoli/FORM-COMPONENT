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
        if (!input.amount){ errors.amount = "Amount cannot be empty"}

        //walletAdress Validation
        if (!input.walletAdress){ errors.walletAdress = "Wallet Adress cannot be empty"} 

        //email Validation
        if (!input.email){errors.email = "Email cannot be empty"}
          else if(!(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/).test(input.email)){errors.email = "Email its not a valid email"}

        //mobileNumber Validation
        if (!input.mobileNumber){ errors.mobileNumber = "Mobile number cannot be empty"} 
         else if(!(/\d/).test(input.mobileNumber)) {errors.mobileNumber = "Mobile number must be a number"}
         
        //WalletPool Validation
        if (!input.walletPool){errors.walletPool = "WalletPool cannot be empty"} 

        //password Validation
        if (!input.password){errors.password = "Password Adress cannot be empty"} 

        return errors
}



const Form = () => {

    const[input,setInput]=useState({})
    let [errors, setErrors] = useState({}) 
    const [loader,setLoader] = useState(false)
    const[showPassword,setShowPassword] = useState(false)

    //FUNCTION SUBMIT
    function apiCall(){
      console.log("envio completo",input);
      setLoader((false));
      setInput({})
    }
    //FUNTION HANDLEBLUR
    const handleBlur=async (ev)=>{
      let errores=getErrors(input)
      setErrors(({...errors,[ev.target.name]:errores[ev.target.name]}))
    }


    //FUNCTION HANDLECHANGE
    const validate=async (ev)=>{
      setInput((input)=>({...input,[ev.target.name]:ev.target.value}))
      setErrors((errors)=>({...errors,[ev.target.name]:""}))
    }

    //SHOW OR NOTSHOW PASSWORD
    const showPass=()=>{
      setShowPassword(!showPassword)
      console.log("showPass",showPassword)
    }
    
    
    //FUNCTION VALIDATE SUBMIT
    const handleSubmit= async(e)=>{
        e.preventDefault();
        errors=getErrors(input)
        setErrors(errors)
        Object.entries(errors).length !== 0?
          console.log("Show errors:",errors)
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
    onBlur={(e) => handleBlur(e)}
>
  <div>

    <h1>TITULO.</h1>
  
    <label >Amount *</label>
    <input type="text" name="amount" value={input.amount?input.amount:""}   placeholder="Amount of Beneficial Owners" className={errors.amount&&"formError"}/>
    
    <label >Wallet Adress *</label>
    <div>
      <AiOutlineQuestionCircle/>
      <input type="text" name="walletAdress" value={input.walletAdress?input.walletAdress:""}  placeholder="Your Wallet Adress" className={errors.walletAdress&&"formError"}/>
    </div>
    

    <label >E-mail *</label>
    <div>
      <AiOutlineQuestionCircle/>
      <input type="text" name="email"  value={input.email?input.email:""}  placeholder="Your E-Mail"  className={errors.email&&"formError"} />
    </div>
    <label>Phone Number *</label>
    <div >
      <AiOutlineQuestionCircle/>
      <input type="text" name="mobileNumber"  value={input.mobileNumber?input.mobileNumber:""}  placeholder="Your Phone Number"  className={errors.mobileNumber&&"formError"}/>
    </div>
    
    <label >walletPool *</label>
    <input type="text" name="walletPool"  value={input.walletPool?input.walletPool:""} placeholder="Wallet Address Pool" className={errors.walletPool&&"formError"}/>

    <label>Password *</label>
    <div onClick={(ev)=>showPass(ev)}>
      {!showPassword?<IoEyeOffOutline/>:<IoEyeOutline/>}
      <input type={showPassword?"text":"Password"} name="password"  value={input.password?input.password:""} placeholder="Your Password" className={errors.password&&"formError"}/>
    </div>

    <button type="submit" name="next" className={loader?"Button1 Button1Disable":"Button1"} value="Button1" >{loader?"Loading...":"Next"}</button>
    
    <section>
        {Object.values(errors).map((error,i) => {return <div key={i}>{error}</div> })}
    </section>
  </div>
</form>
  );
};

export default Form;