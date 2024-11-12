// import { Sidebar } from "flowbite-react";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/authContext.jsx";

// function SideBar() {



//   return (
//     <div


//     <div>
//     <Navbar className=" w-full bg-primary text-white" fluid rounded>
//       <Navbar.Brand href="/">
//         <img
//           src="IconoLunaFinal.png"
//           className=" mt-1 w-[100px]"
//           alt="IGJ Logo"
//         />
//         <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//           LUNA
//         </span>
//       </Navbar.Brand>
//       {user != null ? (
//         <>
//           <Navbar.Collapse>
//             <Navbar.Link className="text-white" href="#">
//               Inicio
//             </Navbar.Link>
//             <Navbar.Link className="text-white" href="#">
//               {user.usuario.departamento.descripcion}
//             </Navbar.Link>
//             <Navbar.Link className="text-white" href="#">
//               Contacto
//             </Navbar.Link>
//           </Navbar.Collapse>
//           <div className="flex md:order-2">
//       <div className="flex items-center ">
//         <img
//           src="logo-bandera-escudo.svg"
//           className="mr-3 w-[150px]"
//           alt="Argentina logo"
//         />
//       </div>
//             <Dropdown
//               arrowIcon={false}
//               inline
//               label={<Avatar alt="User settings" img="" rounded />}
//             >
//               <Dropdown.Header>
//                 <span className="block text-sm">{user.usuario.userName}</span>
//                 <span className="block truncate text-sm font-medium">
//                   {user.usuario.nombre} {user.usuario.apellido}
//                 </span>
//               </Dropdown.Header>
//               <Dropdown.Divider />
//               <Dropdown.Item>
//                 <span href="/" onClick={logout}>
//                   salir
//                 </span>
//               </Dropdown.Item>
//             </Dropdown>
//             <Navbar.Toggle />
//           </div>
//         </>
//       ) : (
//         <div className="flex items-center ">
//         <img
//           src="logo-bandera-escudo.svg"
//           className="mr-3 w-[150px]"
//           alt="Argentina logo"
//         />
//       </div>
//       )}
//     </Navbar>
//   </div>













//       className={`bg-gray-50 ${!sidebarView ? "h-full items-start absolute" : ""}`}
//     >
//       <button onClick={verDatos}>ver datos</button>
//       <div
//         onClick={() => setSidebarView(!sidebarView)}
//         className={`p-2 flex justify-end cursor-pointer transition-transform duration-300 ${
//           !sidebarView ? "h-full items-start" : "hidden"
//         }`}
//       >
//         <img
//           src="icons/arrowLeft.svg"
//           alt="flecha"
//           className={`transition-transform duration-300 ${
//             !sidebarView ? "rotate-180" : ""
//           }`}
//         />
//       </div>
//       <Sidebar
//         className={`transition-all duration-300 ${
//           sidebarView ? "block opacity-100" : "hidden opacity-0 translate-x-full"
//         }`}
//       >
//         <div
//           onClick={() => setSidebarView(!sidebarView)}
//           className={`p-2 flex justify-end cursor-pointer transition-transform duration-300 ${
//             !sidebarView ? "h-full items-start" : ""
//           }`}
//         >
//           <img
//             src="icons/arrowLeft.svg"
//             alt="flecha"
//             className={`transition-transform duration-300 ${
//               !sidebarView ? "rotate-180" : ""
//             }`}
//           />
//         </div>
//         <Sidebar.Items>
//           <Sidebar.ItemGroup>
//             {/* Verifica que los datos del usuario están disponibles */}
//             {isDataLoaded && user.usuario ? (
//               <>
//                 <Sidebar.Item className="text-primary font-bold" href="/busquedasociedades">
//                   {user.usuario.userName}
//                 </Sidebar.Item>
//                 <Sidebar.Collapse className="text-primary font-bold" label={user.usuario.departamento.descripcion}>
//                   {user.rolFuncion && user.rolFuncion.length > 0 ? (
//                     user.rolFuncion.map((r, i) => (
//                       <Sidebar.Item
//                         className="text-primary text-sm text-start"
//                         href={r.funcion.url}
//                         key={i}
//                       >
//                         {r.funcion.nombre}
//                       </Sidebar.Item>
//                     ))
//                   ) : (
//                     <div className="text-gray-500 text-sm">No tiene funciones asignadas</div>
//                   )}
//                 </Sidebar.Collapse>
//               </>
//             ) : (
//               <div className="text-gray-500 text-sm">Cargando datos...</div>
//             )}
//           </Sidebar.ItemGroup>
//         </Sidebar.Items>
//       </Sidebar>
//     </div>
//   );
// }

// export default SideBar;
