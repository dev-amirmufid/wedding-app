import{a,r as e,j as s}from"./app-55aa7177.js";import{$ as t}from"./transition-1b81608f.js";import{_ as l}from"./dialog-ef626948.js";function o({children:o,show:r=!1,maxWidth:n="2xl",closeable:m=!0,onClose:i=(()=>{})}){const d={sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"}[n];return a(t,{show:r,as:e.Fragment,leave:"duration-200",children:s(l,{as:"div",id:"modal",className:"fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all",onClose:()=>{m&&i()},children:[a(t.Child,{as:e.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:a("div",{className:"absolute inset-0 bg-gray-500/75"})}),a(t.Child,{as:e.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:a(l.Panel,{className:`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${d}`,children:o})})]})})}export{o as M};
