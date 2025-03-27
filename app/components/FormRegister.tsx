import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, PhoneIcon, MailIcon, UserIcon, CakeIcon, KeyIcon, ShieldCheckIcon } from "lucide-react";

// Definimos la interfaz para los valores del formulario
type FormValues = {
    nombre: string;
    celular: string;
    nacimiento: string;
    email: string;
    password: string;
    confirmPassword: string;
    codigo?: string;
};

// Definimos la interfaz para los props del componente
interface FormRegisterProps {
    handleRocketLaunch: () => void;
}

const FormRegister: React.FC<FormRegisterProps> = ({ handleRocketLaunch }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const [showPassword, setShowPassword] = useState<{ password: boolean; confirmPassword: boolean; }>({
        password: false,
        confirmPassword: false,
    });
    const [message, setMessage] = useState<{ text: string; type: string; }>({ text: "", type: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const formFields = [
        { id: "nombre", label: "Nombre", placeholder: "Nombre", type: "text", icon: <UserIcon className="w-5 h-5 text-gray-500" /> },
        { id: "celular", label: "Celular", placeholder: "1234567890", type: "text", icon: <PhoneIcon className="w-5 h-5 text-gray-500" /> },
        { id: "nacimiento", label: "Día de nacimiento", placeholder: "DD/MM/AAAA", type: "date", icon: <CakeIcon className="w-5 h-5 text-gray-500" /> },
        { id: "email", label: "Email", placeholder: "example@gmail.com", icon: <MailIcon className="w-5 h-5 text-gray-500" /> },
        { id: "password", label: "Contraseña", placeholder: "***********", type: "password", showEye: true, icon: <KeyIcon className="w-5 h-5 text-gray-500" /> },
        { id: "confirmPassword", label: "Confirma tu contraseña", placeholder: "***********", type: "password", showEye: true, icon: <KeyIcon className="w-5 h-5 text-gray-500" /> },
        { id: "codigo", label: "Código de administrador (opcional)", placeholder: "Código", type: "text", icon: <ShieldCheckIcon className="w-5 h-5 text-gray-500" /> }
    ];
    
    const onSubmit = async (data: FormValues) => {
        setMessage({ text: "", type: "" });
        setIsSubmitting(true);

        // Asignamos el rol según el código ingresado
        const rol = data.codigo === "123456789" ? "admin" : "user";

        const user = {
            name: data.nombre,
            email: data.email,
            password: data.password,
            rol,
            celular: data.celular,
            fechaNacimiento: new Date(data.nacimiento).toISOString(),
        };

        try {
            const response = await fetch("http://localhost:5261/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                setMessage({ text: "Usuario registrado correctamente", type: "success" });
                handleRocketLaunch();
            } else {
                const errorText = await response.text();
                setMessage({ text: response.status === 409 ? "El email ya está registrado" : errorText || "Ocurrió un error", type: "error" });
            }
        } catch {
            setMessage({ text: "Ocurrió un error al registrar el usuario", type: "error" });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setMessage({ text: "", type: "" }), 4000);
        }
    };

    return (
        <>
            {message.text && (
                <div className={`border-l-4 p-4 rounded-md shadow-md mb-4 transition-all duration-300 ease-in-out ${message.type === "success" ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700"}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {formFields.map((field) => (
                    <div key={field.id} className={`flex items-center bg-gray-100 p-3 rounded-lg space-x-2 ${errors[field.id as keyof FormValues] ? "bg-red-50 border border-red-300 text-red-700" : ""}`}>
                        <div className="flex-1">
                            <span>{field.icon}</span>
                            <label htmlFor={field.id} className="block text-xs text-black">{field.label}</label>
                            <input
                                {...register(field.id as keyof FormValues, {
                                    required: field.id !== "codigo" && "Este campo es obligatorio",
                                    pattern: field.id === "email" ? { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El email no es válido" } : undefined,
                                    minLength: field.id === "password" ? { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } : undefined,
                                    validate: field.id === "confirmPassword" ? (value) => value === watch("password") || "Las contraseñas no coinciden" : undefined,
                                })}
                                type={field.showEye ? (showPassword[field.id as "password" | "confirmPassword"] ? "text" : "password") : field.type}
                                name={field.id}
                                id={field.id}
                                placeholder={field.placeholder}
                                className="w-full bg-transparent text-black font-bold text-base outline-none"
                            />
                            {errors[field.id as keyof FormValues] && <span className="text-red-500 text-xs">{errors[field.id as keyof FormValues]?.message}</span>}
                        </div>
                        {field.showEye && (
                            <button type="button" onClick={() => setShowPassword(prev => ({ ...prev, [field.id as "password" | "confirmPassword"]: !prev[field.id as "password" | "confirmPassword"] }))}>
                                {showPassword[field.id as "password" | "confirmPassword"] ? <EyeOffIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
                            </button>
                        )}
                    </div>
                ))}
                <button type="submit" className="w-full bg-orange-500 text-white text-lg font-bold py-3 rounded-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Registrando..." : "Crear Cuenta"}
                </button>
            </form>
        </>
    );
};

export default FormRegister;
