import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, PhoneIcon, MailIcon, UserIcon, CakeIcon, KeyIcon, ShieldCheckIcon } from "lucide-react"
import { registerUser } from "~/services/authService";
import { useNavigate } from "@remix-run/react";

interface FormData {
    codigo: string;
    nacimiento: string;
    name: string;
    email: string;
    password: string;
    celular: string;
}
const FormRegister = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formFields = [
        { id: "name", label: "Nombre", placeholder: "Nombre", type: "text", icon: <UserIcon className="w-5 h-5 text-gray-500" /> },
        { id: "celular", label: "Celular", placeholder: "1234567890", type: "text", icon: <PhoneIcon className="w-5 h-5 text-gray-500" /> },
        { id: "nacimiento", label: "Día de nacimiento", placeholder: "DD/MM/AAAA", type: "date", icon: <CakeIcon className="w-5 h-5 text-gray-500" /> },
        { id: "email", label: "Email", placeholder: "example@gmail.com", icon: <MailIcon className="w-5 h-5 text-gray-500" /> },
        { id: "password", label: "Contraseña", placeholder: "***********", type: "password", showEye: true, icon: <KeyIcon className="w-5 h-5 text-gray-500" /> },
        { id: "confirmPassword", label: "Confirma tu contraseña", placeholder: "***********", type: "password", showEye: true, icon: <KeyIcon className="w-5 h-5 text-gray-500" /> },
        { id: "codigo", label: "Código de administrador (opcional)", placeholder: "Código", type: "text", icon: <ShieldCheckIcon className="w-5 h-5 text-gray-500" /> }
    ];
    const onSubmit = async (data: { codigo: string; nacimiento: string; name: any; email: any; password: any; celular: any; }) => {

        setMessage({ text: "", type: "" });
        setIsSubmitting(true);

        // Validación del código para asignar el rol de administrador
        //TODO: lo debo guardo en las variables de entorno
        const rol = data.codigo === "123456789" ? "admin" : "user";

        const fechaNacimiento = new Date(data.nacimiento as string);
        const user = {
            name: data.name,
            email: data.email,
            password: data.password,
            rol: rol,
            celular: data.celular,
            fechaNacimiento: fechaNacimiento.toISOString(),
        };

        try {
            const response = await registerUser(user);
            if (response.token) {
                setMessage({ text: "Usuario registrado correctamente", type: "success" });
                document.cookie = `token=${response.token}; path=/`;
                return navigate("/");
            }
        } catch (error) {
            if ((error as any).message === "El email ya está registrado.") {
                setMessage({ text: "El email ya está registrado. Por favor, usa otro.", type: "error" });
            } else {
                setMessage({ text: (error as Error).message, type: "error" });
            }
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setMessage({ text: "", type: "" }), 4000);
        }
    };

    const togglePasswordVisibility = (field: string) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field as keyof typeof prevState],
        }));
    };

    const password = watch("password");
    return (
        <>
            {message.text && (
                <div
                    className={`${message.type === "success"
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "bg-red-100 border-red-500 text-red-700"
                        } border-l-4 p-4 rounded-md shadow-md mb-4 transition-all duration-300 ease-in-out transform hover:scale-105`}
                >
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {formFields.map((field) => (
                    <div key={field.id} className={`flex items-center bg-[#ebebeb]  p-3 rounded-lg space-x-2 ${errors[field.id] ? "bg-red-50 border border-red-300 text-red-700" : ""}`}>
                        <div className="flex-1">
                            <span>{field.icon}</span>
                            <label htmlFor={field.id} className="block text-xs text-black">
                                {field.label}
                            </label>
                            <input
                                // validacion que el campo sea un email valido
                                {...register(field.id, {
                                    required: field.id !== "codigo" && "Este campo es obligatorio",
                                    pattern: field.id === "email" && {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "El email no es válido",
                                    },
                                    // validacion que la contraseña tenga 6 caracteres
                                    ...field.id === "password" && {
                                        minLength: {
                                            value: 6,
                                            message: "La contraseña debe tener al menos 6 caracteres",
                                        },
                                    },
                                    // validacion que sea 10 digitos para el celular
                                    ...field.id === "celular" && {
                                        minLength: {
                                            value: 10,
                                            message: "El celular debe tener 10 dígitos",

                                        },
                                    },
                                    // validacion que sea la misma contraseña
                                    ...field.id === "confirmPassword" && {
                                        validate: (value) => value === password || "Las contraseñas no coinciden",

                                    },
                                    // Validacion solo numeros
                                    ...field.id === "celular" && {
                                        validate: (value) =>
                                            /^[0-9]{10}$/.test(value) || "El celular debe contener solo 10 dígitos numéricos",
                                    },
                                })}
                                type={field.type === "date"
                                    ? "date"
                                    : field.showEye && showPassword[field.id]
                                        ? "text"
                                        : field.type}
                                name={field.id}
                                id={field.id}
                                placeholder={field.placeholder}
                                className="w-full bg-transparent text-black font-bold text-base outline-none"
                                onClick={(e) => e.target.showPicker()}
                            />
                            {errors[field.id] && <span className="text-red-500 text-xs">{String(errors[field.id]?.message)}</span>}
                        </div>
                        {field.showEye && (
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility(field.id)}
                                className="focus:outline-none"
                            >
                                {showPassword[field.id] ? (
                                    <EyeOffIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                                ) : (
                                    <EyeIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                                )}
                            </button>
                        )}
                    </div>
                ))}
                {message.text && (
                    <div
                        className={`${message.type === "success"
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "bg-red-100 border-red-500 text-red-700"
                            } border-l-4 p-4 rounded-md shadow-md mb-4 transition-all duration-300 ease-in-out transform hover:scale-105`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Botón de Envío */}
                <button
                    type="submit"
                    className="w-full bg-[#faa307] text-white text-[25px] font-black py-4 rounded-lg"
                >
                    Crear Cuenta
                </button>
            </form>
        </>
    )
}

export default FormRegister;