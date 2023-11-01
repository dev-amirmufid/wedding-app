import{q as e,W as a,j as t,a as i,c as r,d as n}from"./app-55aa7177.js";import{$ as s}from"./transition-1b81608f.js";function l({mustVerifyEmail:l,status:m,className:o=""}){const c=e().props.auth.user,{data:d,setData:u,patch:f,errors:p,processing:h,recentlySuccessful:g}=a({name:c.name,email:c.email});return t("section",{className:o,children:[t("header",{children:[i("h2",{className:"text-lg font-medium text-gray-900",children:"Profile Information"}),i("p",{className:"mt-1 text-sm text-gray-600",children:"Update your account's profile information and email address."})]}),t("form",{onSubmit:e=>{e.preventDefault(),f(route("profile.update"))},className:"mt-6 space-y-6",children:[t("div",{children:[i(r.Input,{size:"lg",label:"Name",value:d.name,autoComplete:"name",onChange:e=>u("name",e.target.value),error:p.name}),p.name&&i(r.Typography,{variant:"small",color:"red",className:"flex items-center gap-1 font-normal mt-2",children:p.name})]}),t("div",{children:[i(r.Input,{size:"lg",label:"Email",value:d.email,autoComplete:"email",onChange:e=>u("email",e.target.value),error:p.email}),p.email&&i(r.Typography,{variant:"small",color:"red",className:"flex items-center gap-1 font-normal mt-2",children:p.email})]}),l&&null===c.email_verified_at&&t("div",{children:[t("p",{className:"text-sm mt-2 text-gray-800",children:["Your email address is unverified.",i(n,{href:route("verification.send"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Click here to re-send the verification email."})]}),"verification-link-sent"===m&&i("div",{className:"mt-2 font-medium text-sm text-green-600",children:"A new verification link has been sent to your email address."})]}),t("div",{className:"flex items-center gap-4",children:[i(r.Button,{type:"submit",disabled:h,size:"sm",children:"Save"}),i(s,{show:g,enterFrom:"opacity-0",leaveTo:"opacity-0",className:"transition ease-in-out",children:i("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{l as default};