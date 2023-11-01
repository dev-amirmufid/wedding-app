import{r as e,W as t,j as a,a as r,c as o}from"./app-55aa7177.js";import{M as s}from"./Modal-33b227f1.js";import"./transition-1b81608f.js";import"./dialog-ef626948.js";function l({className:l=""}){const[n,c]=e.useState(!1),d=e.useRef(),{data:i,setData:u,delete:m,processing:p,reset:y,errors:h}=t({password:""}),f=()=>{c(!1),y()};return a("section",{className:`space-y-6 ${l}`,children:[a("header",{children:[r("h2",{className:"text-lg font-medium text-gray-900",children:"Delete Account"}),r("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),r(o.Button,{color:"red",onClick:()=>{c(!0)},size:"sm",children:"Delete Account"}),r(s,{show:n,onClose:f,children:a("form",{onSubmit:e=>{e.preventDefault(),m(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>f(),onError:()=>d.current.focus(),onFinish:()=>y()})},className:"p-6",children:[r("h2",{className:"text-lg font-medium text-gray-900",children:"Are you sure you want to delete your account?"}),r("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),a("div",{className:"mt-6",children:[r(o.Input,{ref:d,size:"lg",label:"Password",value:i.password,autoComplete:"password",onChange:e=>u("password",e.target.value),error:!!h.password}),h.password&&r(Typography,{variant:"small",color:"red",className:"flex items-center gap-1 font-normal mt-2",children:h.password})]}),a("div",{className:"mt-6 flex justify-end gap-3",children:[r(o.Button,{onClick:f,variant:"outlined",color:"gray",size:"sm",children:"Cancel"}),r(o.Button,{type:"submit",color:"red",disabled:p,size:"sm",children:"Delete Account"})]})]})})]})}export{l as default};