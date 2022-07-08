export interface User {
    nombre: string;
    apellido: string;
    correo: string;
    contraseña: string;
    cedula: string;
    genero: 'Masculino' | 'Femenico' | 'Otro'
}