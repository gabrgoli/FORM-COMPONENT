import React from "react";
import { useState } from 'react';
import './Form1.css'
import { HiOutlineMicrophone } from "react-icons/hi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";


function getErrors(input){
  let errorsForm = {};
  //email Validation
  if(input.email===''){
    errorsForm.email = "Email cannot be empty"
  }
  else{
    if(!(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/).test(input.email)){
      errorsForm.email = "Email its not a valid email"
    }
    else{
      errorsForm.email = ""
    }
  }
  return errorsForm;
}

function  Form() {
    const [input,setInput]=useState({email:''})
    let [errors, setErrors] = useState({email:''}) 

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

    //FUNCTION SUBMIT
    function handleSubmit(e){
        e.preventDefault();

        errors=getErrors(input)
        setErrors(getErrors(input))

        if(errors.email!==''){
            console.log("hay errores:",errors)
        }
        else{
          (
            setLoader(true)
            (setTimeout(apiCall, 3000))
          )
        }
    }

  return (
      <form 
          id="msform"
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => validate(e)}
      >
          <div>
              <h1>TITULO.</h1>
            
              <label className="Form1Label">E-mail *</label>
              <div className="Form1Icon"><AiOutlineQuestionCircle/></div>
              <input type="text" name="email" placeholder="Your E-Mail" style={errors.email?{border:"2px solid red"}:{}} className={errors.email&&"form2"} />
              
              <button type="submit" name="next" className="Button1" value="Button1" >{loader?"Loading...":"Next"}</button>

              <section className="errorsClass">
                  {errors.email?<div>{errors.email} </div>:<></>}
              </section>
          </div>
      </form>
  );
};

export default Form;