
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
    apellido: string,
    correo: string,
    edad: number,
    password: string,
    ci: number,
    uid: string,
    perfil: 'visitante' | 'admin'
    genero: 'Masculino' | 'Femenino' | 'Otro'
}

export interface equipoI {
    nombre: string;
    pais: 'españa' | 'francia' | 'italia';
    posicion: string;
    id: string
}

export interface cliente {
    uid: string;
    email: string;
    nombre: string;
    celular: string;
    foto: string;
    referencia: string;
    ubicacion: {
        lat: number;
        lng: number;
    }
}

export const Paises = ['españa', 'francia', 'italia']