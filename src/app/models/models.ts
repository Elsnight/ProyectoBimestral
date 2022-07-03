
export interface Equipo {
    nombre: string;
    logo: string;
    id: string;
    puesto: number;
    // apellido: string;
    // edad: number;
    // sexo: 'M' | 'F';
    // cedula: string;

}

export interface Estudiante {
    nombre: string;
    apellido: string;
    edad: number;
    sexo: 'M' | 'F';
    cedula: string;

}

export interface Resultado {
    equipo1: {
        nombre: string;
        goles: number
    }
    equipo2: {
        nombre: string;
        goles: number
    }
    arbitro?: string;
    id?: string
}

export interface ResultadoI {
    equipo1: {
        nombre: string;
        goles: number
    }
    equipo2: {
        nombre: string;
        goles: number
    }
    arbitro?: string;
    id?: string
}

export interface User {
    nombre: string,
    edad: number,
    correo: string,
    uid: string,
    password: string,
    perfil: 'visitante' | 'admin'
}