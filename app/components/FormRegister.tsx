// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { EyeIcon, EyeOffIcon, PhoneIcon, MailIcon, UserIcon, CakeIcon, KeyIcon, ShieldCheckIcon } from "lucide-react"


// const FormRegister = ({ handleRocketLaunch }) => {
//     const { register, handleSubmit, formState: { errors }, watch } = useForm();
//     const [showPassword, setShowPassword] = useState({
//         password: false,
//         confirmPassword: false,
//     });

//     const [message, setMessage] = useState({ text: "", type: "" });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const formFields = [
//         { id: "nombre", label: "Nombre", placeholder: "Nombre", type: "text", icon: <UserIcon className="w-5 h-5 text-gray-500" /> },
//         { id: "celular", label: "Celular", placeholder: "1234567890", type: "text", icon: <PhoneIcon className="w-5 h-5 text-gray-500" /> },
//         { id: "nacimiento", label: "Día de nacimiento", placeholder: "DD/MM/AAAA", type: "date", icon: <CakeIcon className="w-5 h-5 text-gray-500" /> },
//         { id: "email", label: "Email", placeholder: "example@gmail.com", icon: <MailIcon className="w-5 h-5 text-gray-500" /> },
//         { id: "password", label: "Contraseña", placeholder: "***********", type: "password", showEye: true, icon: <KeyIcon className="w-5 h-5 text-gray-500" /> },
//         { id: "confirmPassword", label: "Confirma tu contraseña", placeholder: "***********", type: "password", showEye: true, icon: <KeyIcon className="w-5 h-5 text-gray-500" /> },
//         { id: "codigo", label: "Código de administrador (opcional)", placeholder: "Código", type: "text", icon: <ShieldCheckIcon className="w-5 h-5 text-gray-500" /> }
//     ];
//     const onSubmit = async (data) => {

//         setMessage({ text: "", type: "" });
//         setIsSubmitting(true);

//         // Validación del código para asignar el rol de administrador
//         //TODO: lo debo guardo en las variables de entorno
//         const rol = data.codigo === "123456789" ? "admin" : "user";

//         const fechaNacimiento = new Date(data.nacimiento as string);
//         const user = {
//             name: data.nombre,
//             email: data.email,
//             password: data.password,
//             rol: rol,
//             celular: data.celular,
//             fechaNacimiento: fechaNacimiento.toISOString(),
//         };

//         try {
//             const response = await fetch("http://localhost:5261/api/auth/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(user),
//             });

//             // Verifica si la respuesta es exitosa
//             if (response.ok) {
//                 const data = await response.json();
//                 setMessage({ text: "Usuario registrado correctamente", type: "success" });
//                 handleRocketLaunch();
//             } else {
//                 // Si la respuesta no es ok, manejar el error
//                 const errorText = await response.text(); // Leemos la respuesta como texto

//                 if (response.status === 500) {
//                     // Si el error es 500, mostrar el mensaje de error
//                     setMessage({ text: errorText || "Ocurrió un error interno en el servidor", type: "error" });
//                 } else if (response.status === 409) {
//                     // Si el status es 409, significa que el email ya está registrado
//                     setMessage({ text: "El email ya está registrado", type: "error" });
//                 } else {
//                     // Otros errores del servidor
//                     const errorData = await response.json();
//                     setMessage({ text: errorData.message || "Hubo un error al registrar el usuario", type: "error" });
//                 }
//             }
//         } catch (error) {
//             // Error en la solicitud (conexión, tiempo de espera, etc.)
//             setMessage({ text: "Ocurrió un error al registrar el usuario", type: "error" });
//         } finally {
//             setIsSubmitting(false);
//             setTimeout(() => {
//                 setMessage({ text: "", type: "" });
//             }, 4000)
//         }
//     };

//     const togglePasswordVisibility = (field: string) => {
//         setShowPassword((prevState) => ({
//             ...prevState,
//             [field]: !prevState[field as keyof typeof prevState],
//         }));
//     };
//     const password = watch("password");
//     return (
//         <>
//             {message.text && (
//                 <div
//                     className={`${message.type === "success"
//                         ? "bg-green-100 border-green-500 text-green-700"
//                         : "bg-red-100 border-red-500 text-red-700"
//                         } border-l-4 p-4 rounded-md shadow-md mb-4 transition-all duration-300 ease-in-out transform hover:scale-105`}
//                 >
//                     {message.text}
//                 </div>
//             )}
//             <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//                 {formFields.map((field) => (
//                     <div key={field.id} className={`flex items-center bg-[#ebebeb]  p-3 rounded-lg space-x-2 ${errors[field.id] ? "bg-red-50 border border-red-300 text-red-700" : ""}`}>
//                         <div className="flex-1">
//                             <span>{field.icon}</span>
//                             <label htmlFor={field.id} className="block text-xs text-black">
//                                 {field.label}
//                             </label>
//                             <input
//                                 // validacion que el campo sea un email valido
//                                 {...register(field.id, {
//                                     required: field.id !== "codigo" && "Este campo es obligatorio",
//                                     pattern: field.id === "email" && {
//                                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                         message: "El email no es válido",
//                                     },
//                                     // validacion que la contraseña tenga 6 caracteres
//                                     ...field.id === "password" && {
//                                         minLength: field.id === "password" && {
//                                             value: 6,
//                                             message: "La contraseña debe tener al menos 6 caracteres",
//                                         },
//                                     },
//                                     // validacion que sea 10 digitos para el celular
//                                     ...field.id === "celular" && {
//                                         minLength: field.id === "celular" && {
//                                             value: 10,
//                                             message: "El celular debe tener 10 dígitos",

//                                         },
//                                     },
//                                     // validacion que sea la misma contraseña
//                                     ...field.id === "confirmPassword" && {
//                                         validate: field.id === "confirmPassword" && {
//                                             value: (value) => value === password || "Las contraseñas no coinciden",
//                                         }
//                                     },
//                                     // Validacion solo numeros
//                                     ...field.id === "celular" && {
//                                         validate: field.id === "celular" && {
//                                             value: (value) =>
//                                                 /^[0-9]{10}$/.test(value) || "El celular debe contener solo 10 dígitos numéricos",
//                                         },
//                                     }
//                                 })}
//                                 type={field.type === "date"
//                                     ? "date"
//                                     : field.showEye && showPassword[field.id]
//                                         ? "text"
//                                         : field.type}
//                                 name={field.id}
//                                 id={field.id}
//                                 placeholder={field.placeholder}
//                                 className="w-full bg-transparent text-black font-bold text-base outline-none"
//                                 onClick={(e) => e.target.showPicker()}
//                             />
//                             {errors[field.id] && <span className="text-red-500 text-xs">{String(errors[field.id]?.message)}</span>}
//                         </div>
//                         {field.showEye && (
//                             <button
//                                 type="button"
//                                 onClick={() => togglePasswordVisibility(field.id)}
//                                 className="focus:outline-none"
//                             >
//                                 {showPassword[field.id] ? (
//                                     <EyeOffIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
//                                 ) : (
//                                     <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
//                                 )}
//                             </button>
//                         )}
//                     </div>
//                 ))}
//                 {message.text && (
//                     <div
//                         className={`${message.type === "success"
//                             ? "bg-green-100 border-green-500 text-green-700"
//                             : "bg-red-100 border-red-500 text-red-700"
//                             } border-l-4 p-4 rounded-md shadow-md mb-4 transition-all duration-300 ease-in-out transform hover:scale-105`}
//                     >
//                         {message.text}
//                     </div>
//                 )}

//                 {/* Botón de Envío */}
//                 <button
//                     type="submit"
//                     className="w-full bg-[#faa307] text-white text-[25px] font-black py-4 rounded-lg"
//                 >
//                     Crear Cuenta
//                 </button>
//             </form>
//         </>
//     )
// }

// export default FormRegister;

import { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import PropTypes from "prop-types";

interface FormRegisterProps {
    handleRocketLaunch: () => void;
}

const FormRegister: React.FC<FormRegisterProps> = ({ handleRocketLaunch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const onSubmit = (data: Record<string, string>) => {
        console.log("Form Data:", data);
        handleRocketLaunch();
    };
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input de Correo */}
            <input
                type="email"
                placeholder="Correo electrónico"
                {...register("email", { required: "El correo es obligatorio" })}
                className="w-full p-3 border rounded-lg"
            />
            {errors.email && (
                <p className="text-red-500">{(errors.email as FieldError)?.message || "Error en el campo"}</p>
            )}

            {/* Input de Contraseña */}
            <div className="relative">
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Contraseña"
                    {...register("password", { required: "La contraseña es obligatoria" })}
                    className="w-full p-3 border rounded-lg"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                    {passwordVisible ? "🙈" : "👁️"}
                </button>
            </div>
            {errors.password && (
                <p className="text-red-500">{(errors.password as FieldError)?.message || "Error en el campo"}</p>
            )}

            {/* Botón de Enviar */}
            <button
                type="submit"
                className="w-full bg-[#faa307] text-white text-[25px] font-black py-4 rounded-lg"
            >
                Crear Cuenta
            </button>
        </form>
    );
};

FormRegister.propTypes = {
    handleRocketLaunch: PropTypes.func.isRequired,
};

export default FormRegister;