import{W as e,r as a,j as r,a as s,b as t,c as l}from"./app-55aa7177.js";import{G as m}from"./GuestLayout-05c5bbdf.js";import"./ApplicationLogo-7635b2b3.js";function o({status:o,canResetPassword:i}){const{data:n,setData:c,post:d,processing:p,errors:u,reset:g}=e({email:"",password:"",remember:!1});a.useEffect((()=>()=>{g("password")}),[]);return r(m,{children:[s(t,{title:"Log in"}),o&&s("div",{className:"mb-4 font-medium text-sm text-green-600",children:o}),r("form",{onSubmit:e=>{e.preventDefault(),d(route("login"))},children:[r("div",{children:[s(l.Input,{type:"email",size:"lg",label:"Email",value:n.email,autoComplete:"username",onChange:e=>c("email",e.target.value),error:u.email}),u.email&&s(l.Typography,{variant:"small",color:"red",className:"flex items-center gap-1 font-normal mt-2",children:u.email})]}),r("div",{className:"mt-4",children:[s(l.Input,{type:"password",size:"lg",label:"Password",value:n.password,autoComplete:"current-password",onChange:e=>c("password",e.target.value),error:u.password}),u.password&&s(l.Typography,{variant:"small",color:"red",className:"flex items-center gap-1 font-normal mt-2",children:u.password})]}),s("div",{className:"block mt-4",children:s(l.Checkbox,{label:"Remember Me",name:"remember",checked:n.remember,onChange:e=>c("remember",e.target.checked)})}),s("div",{className:"flex items-center justify-end mt-4",children:s(l.Button,{type:"submit",className:"ml-4",disabled:p,size:"sm",children:"Log in"})})]})]})}export{o as default};